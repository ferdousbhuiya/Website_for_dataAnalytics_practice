const oopProjectData = {
    title: "Python Project: OOP Data Pipeline Library",
    metadata: {
        track: 'data-scientist',
        category: 'Project',
        icon: '⚙️',
        description: "Build a reusable data-processing library in Python using classes, inheritance, and composition."
    },
    lessons: [
        {
            number: 1,
            title: "Project Overview: From Scripts to a Library",
            content: `A complete **Object-Oriented Programming** project. You write data-processing scripts once — and they end up copy-pasted into every analysis. The fix: a **reusable library** built with classes.

**The problem:** five analysts each wrote their own "load CSV → clean → export" script with subtle bugs. We will build ONE well-tested, reusable pipeline class they all use.

**The design:**

\`\`\`mermaid
flowchart LR
    A[BasePipeline] --> B[CleanerPipeline]
    A --> C[StatsPipeline]
    A --> D[ReportPipeline]
    B --> E[Reusable load / save / log]
    B --> F[Each subclass overrides run]
\`\`\`

**Core OOP ideas:** classes & objects, inheritance, method overriding, composition, and polymorphism.`
        },
        {
            number: 2,
            title: "Step 1: The Base Class — Encapsulate the Shared Work",
            content: `Start with a **base class** that captures what every pipeline does: load, save, and log. Subclasses only implement the *specific* transform.

\`\`\`python
class BasePipeline:
    def __init__(self, source, destination):
        self.source = source
        self.destination = destination
        self.log = []

    def load(self):
        import pandas as pd
        return pd.read_csv(self.source)

    def save(self, df):
        df.to_csv(self.destination, index=False)

    def log_step(self, msg):
        self.log.append(msg)
        print(f"[{type(self).__name__}] {msg}")

    def run(self):
        raise NotImplementedError("subclass must implement run()")
\`\`\`

**Why encapsulate:** the *how* of load/save lives in ONE place. If the format changes (CSV → Parquet), you fix one method, not five scripts. \`raise NotImplementedError\` enforces that subclasses define \`run()\` — the template-method pattern.`
        },
        {
            number: 3,
            title: "Step 2: Inheritance — Subclasses Override run()",
            content: `Now **inherit** and override only what changes.

\`\`\`python
class CleanerPipeline(BasePipeline):
    def run(self):
        df = self.load()
        self.log_step(f"loaded {len(df):,} rows")
        df = df.drop_duplicates(subset="order_id", keep="last")
        df["amount"] = pd.to_numeric(df["amount"], errors="coerce").fillna(0)
        self.log_step("cleaned + deduped")
        self.save(df)
        self.log_step(f"saved {len(df):,} rows")


class StatsPipeline(BasePipeline):
    def run(self):
        df = self.load()
        summary = df.groupby("region")["amount"].agg(["sum", "mean", "count"])
        self.log_step("computed region stats")
        return summary
\`\`\`

**The payoff:** \`CleanerPipeline\` reuses load/save/log — it only writes run(). \`StatsPipeline\` shares everything but returns instead of saving. Adding a pipeline = a new subclass, not copied code.

**Rule of thumb:** a subclass should override a *method*, not duplicate the base's helpers. If you find yourself copying, the base class is too thin.`
        },
        {
            number: 4,
            title: "Step 3: Composition — Pipelines Inside Pipelines",
            content: `Not everything is "is-a". Sometimes it's **"has-a"** — composition. A reporting pipeline *contains* a cleaner and a stats step.

\`\`\`python
class ReportPipeline:
    """Composes smaller pieces rather than inheriting from all of them."""
    def __init__(self, source, destination):
        self.cleaner = CleanerPipeline(source, destination + "_clean.csv")
        self.stats = StatsPipeline(source, destination + "_stats.csv")

    def run(self):
        self.cleaner.run()                    # clean first
        summary = self.stats.run()            # then aggregate
        summary.to_csv(self.destination + "_summary.csv")
        print("report complete")
\`\`\`

**Composition vs inheritance — the classic decision:**
- **Inheritance** for *is-a*: \`StatsPipeline\` **is a** pipeline.
- **Composition** for *has-a*: \`ReportPipeline\` **has a** cleaner and a stats step.

Prefer composition. It is more flexible (swap the cleaner without touching ReportPipeline) and avoids fragile deep class trees.`
        },
        {
            number: 5,
            title: "Step 4: Polymorphism — One Interface, Many Behaviors",
            content: `**Polymorphism** lets one function call \`run()\` on *any* pipeline — the right subclass method runs automatically.

\`\`\`python
def execute(pipeline):
    """Works with ANY pipeline thanks to polymorphism."""
    print("--- starting ---")
    result = pipeline.run()
    print("--- done ---")
    return result

execute(CleanerPipeline("orders.csv", "clean.csv"))
execute(StatsPipeline("orders.csv", ""))
execute(ReportPipeline("orders.csv", "out"))
\`\`\`

**Why this matters:** \`execute\` knows *nothing* about which pipeline it's given. It only knows the interface (\`run()\` exists). New pipelines plug in without touching \`execute\` — that's open/closed: open for extension, closed for modification.

This is the pattern behind plugins, pytest fixtures, and ORM models.`
        },
        {
            number: 6,
            title: "Step 5: Properties & Encapsulation Done Right",
            content: `Encapsulation controls access — but Python's "private" is a convention (\`_name\`), and **properties** add rules without breaking callers.

\`\`\`python
class CleanerPipeline(BasePipeline):
    def __init__(self, source, destination, min_amount=0):
        super().__init__(source, destination)
        self._min_amount = min_amount

    @property
    def min_amount(self):
        return self._min_amount

    @min_amount.setter
    def min_amount(self, value):
        if value < 0:
            raise ValueError("min_amount cannot be negative")
        self._min_amount = value

    def run(self):
        df = self.load()
        df = df[df["amount"] >= self.min_amount]
        ...
\`\`\`

**Why properties:** today \`min_amount\` is a plain value; tomorrow you might validate it or log changes. With a property you add that logic *without* changing callers — \`pipeline.min_amount = -5\` still fails cleanly. This is how production libraries evolve safely.`
        },
        {
            number: 7,
            title: "Step 6: Testability — A Class That Is Easy to Test",
            content: `The real win of OOP: **testability**. Each class has a small, named behavior you can verify.

\`\`\`python
import pandas as pd
from io import StringIO

def test_cleaner_dedupes():
    data = "order_id,amount\\n1,10\\n1,10\\n2,20"
    p = CleanerPipeline(StringIO(data), "out.csv")
    captured = {}
    p.save = lambda df: captured.update(df=df)   # stub save
    p.run()
    assert len(captured["df"]) == 2          # dup dropped
    assert captured["df"]["amount"].sum() == 30

def test_min_amount_rejects_negative():
    p = CleanerPipeline("x.csv", "y.csv")
    try:
        p.min_amount = -1
        assert False, "should have raised"
    except ValueError:
        pass   # expected
\`\`\`

**Why the class design made testing easy:** dependencies (load/save) are methods you can stub; state (log, min_amount) is inspectable. A script of top-level functions is much harder to test than a class with replaceable seams.`
        },
        {
            number: 8,
            title: "Step 7: Full Library Recap & Interview Guide",
            content: `The library you built, end to end:

\`\`\`mermaid
flowchart TD
    A[BasePipeline: load / save / log / run] --> B[CleanerPipeline]
    A --> C[StatsPipeline]
    B --> D[ReportPipeline via composition]
    D --> E[execute - polymorphic interface]
    E --> F[Properties enforce rules]
    F --> G[Stub save to unit-test]
\`\`\`

**Interview cheat sheet — say these out loud:**
- **"Inheritance for is-a, composition for has-a — prefer composition."**
- **"Encapsulate shared work in a base class; subclasses override only what changes."**
- **"Polymorphism: one interface (run), many behaviors."**
- **"Properties let you add validation without breaking callers."**
- **"Design for testability — stubbable methods, inspectable state."**

That is a complete OOP project: a small, reusable, testable library.`
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What is the difference between a class and an object?",
            answer: "A class is a blueprint that defines attributes and methods; an object is a concrete instance created from the class. 'CleanerPipeline' is the class; 'my_cleaner = CleanerPipeline(...)' creates an object."
        },
        {
            number: 2,
            difficulty: "easy",
            question: "What does inheritance let you do?",
            answer: "It lets a subclass reuse and extend the behavior of a parent class. The subclass inherits the parent's methods and attributes and can override or add to them."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "What is the difference between inheritance and composition, and when do you use each?",
            answer: "Inheritance models 'is-a' (a StatsPipeline is a pipeline); composition models 'has-a' (a ReportPipeline has a cleaner and a stats step). Prefer composition — it is more flexible, avoids deep brittle class trees, and lets you swap components without changing the container."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "What is polymorphism and why is it useful?",
            answer: "Polymorphism means the same interface triggers different implementations. A function that calls run() works on any pipeline because each defines run(). It makes code open for extension without modification."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "Why use a property (@property) instead of a plain attribute?",
            answer: "A property lets you add validation or side effects when the value is set, without changing callers. If you later need min_amount to reject negatives, you add that inside the property — callers keep writing pipeline.min_amount = value."
        },
        {
            number: 6,
            difficulty: "hard",
            question: "How does designing classes as 'seams' improve testability?",
            answer: "A seam is a place where behavior can be swapped. If load() and save() are methods, a test can stub them (e.g., capture the DataFrame instead of writing a file) and inspect the class's state. Scripts of top-level functions have no such seams; classes with replaceable methods do."
        },
        {
            number: 7,
            difficulty: "medium",
            question: "What is the template-method pattern and how did we use it?",
            answer: "The base class defines the skeleton of an algorithm and defers some steps to subclasses. BasePipeline.run() raises NotImplementedError, forcing each subclass to implement the transform while the shared load/save/log stay in the base — that's the template method."
        },
        {
            number: 8,
            difficulty: "medium",
            question: "Why raise NotImplementedError in a base run() method?",
            answer: "It makes the contract explicit: a subclass must implement run() or it fails loudly at runtime rather than silently doing nothing. It documents the interface and catches the error of instantiating an abstract base and calling an unimplemented method."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.oopProjectData = oopProjectData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = oopProjectData;
}