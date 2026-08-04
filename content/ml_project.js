const mlProjectData = {
    title: "ML Project: End-to-End Churn Prediction",
    metadata: {
        track: 'data-scientist',
        category: 'ML Project',
        icon: '🚀',
        description: "One complete, code-first machine learning project — data → DataFrame → EDA → wrangling → model selection → evaluation → deployment-ready."
    },
    lessons: [
        {
            number: 1,
            title: "Project Overview & The Full Pipeline",
            content: `This is a complete, guided machine-learning project run end-to-end on a real business problem: **predicting customer churn**.

**The business goal:** the subscription platform is losing about 8% of customers every month. If we can flag who will churn, the retention team can intervene early. We need a model that identifies high-risk customers *before* they leave.

**The full pipeline we will walk through, step by step:**

\`\`\`mermaid
flowchart LR
    A[1. Get Data] --> B[2. Load into DataFrame]
    B --> C[3. EDA & Visuals]
    C --> D[4. Data Wrangling]
    D --> E[5. Feature Engineering]
    E --> F[6. Train/Val/Test Split]
    F --> G[7. Train Candidate Models]
    G --> H[8. Evaluate & Compare]
    H -->|tune best| G
    H --> I[9. Finalize Model]
    I --> J[10. Deploy & Monitor]
\`\`\`

**Golden rule we will follow:** the **test set is sacred** — we only touch it once, at the very end, to get an honest measure of how the model will do on new customers. Every decision (features, tuning) uses only train + validation.

**The dataset:** the classic Telco Customer Churn dataset (public, 7,043 rows, 21 columns). We simulate it in code below so the whole project runs anywhere with zero file downloads.`
        },
        {
            number: 2,
            title: "Step 1: Getting the Data",
            content: `First, **acquire the data**. In the real world this is an export from a warehouse (SQL), a CSV from a partner, or an API. Here we load the well-known Telco Churn dataset.

**Option A — real file (pandas reads CSV straight from a URL):**

\`\`\`python
import pandas as pd

df = pd.read_csv(
    "https://raw.githubusercontent.com/IBM/telco-customer-churn/master/WA_Fn-UseC---Telco-Customer-Churn.csv"
)
print(df.shape)   # (7043, 21)
df.head()
\`\`\`

**Option B — simulate it (zero-download, fully reproducible):**

\`\`\`python
import numpy as np, pandas as pd
rng = np.random.default_rng(42)

n = 7043
df = pd.DataFrame({
    "customerID": [f"USER-{i:05d}" for i in range(n)],
    "gender": rng.choice(["Male", "Female"], n),
    "SeniorCitizen": rng.integers(0, 2, n),
    "Partner": rng.choice(["Yes", "No"], n, p=[.48, .52]),
    "Dependents": rng.choice(["Yes", "No"], n, p=[.29, .71]),
    "tenure": rng.integers(0, 73, n),
    "PhoneService": rng.choice(["Yes", "No"], n, p=[.90, .10]),
    "InternetService": rng.choice(["DSL", "Fiber optic", "No"], n, p=[.44, .44, .12]),
    "MonthlyCharges": rng.uniform(18, 118, n).round(2),
    "TotalCharges":   rng.uniform(150, 8700, n).round(2),
    "Churn": rng.choice(["No", "Yes"], n, p=[.73, .27]),
})
df = df.drop_duplicates(subset="customerID").reset_index(drop=True)
\`\`\`

**Key check before anything else:** a data scientist always verifies the data *actually loaded* — row/column count, no empty object, shape matches expectation. If \`.shape\` disagrees with the docs, stop and investigate before a single analysis.`
        },
        {
            number: 3,
            title: "Step 2: Loading into a DataFrame",
            content: `Once data is read, the **DataFrame** is your working table. Two checks deliver 90% of the value at this stage: **shape** and **dtypes**.

\`\`\`python
print(df.shape)                      # (7043, 21)  -> rows, columns
print(df.dtypes)                     # dtypes per column
print(df.info())                     # non-null count per column + memory
print(df.isnull().sum().sum())       # total missing cells
\`\`\`

**What to look for:**
- **What's numeric vs categorical?** \`MonthlyCharges\` and \`tenure\` are continuous; \`gender\`, \`InternetService\`, \`Churn\` are categories.
- **Nulls:** how many missing cells? In the Telco set the trap is \`TotalCharges\` often parsed as \`object\` because of a few empty strings — that's a wrangling problem we'll fix in Step 4.
- **Cardinality:** how many distinct values per category. A column with 7,000 unique values (like \`customerID\`) is an ID, not a feature.

**The mental model:** a DataFrame is a table where every column is typed (int, float, or object/category). Data science is a long sequence of questions you ask this table — and wrong dtypes answer wrong.`
        },
        {
            number: 4,
            title: "Step 3: Exploratory Data Analysis (EDA)",
            content: `EDA answers **"what is this data, really?"** before any modeling. We look at distributions, correlations, and how the target (\`Churn\`) relates to each feature.

\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Target balance
print(df["Churn"].value_counts(normalize=True))   # churn ~27%

# 2. Numeric distributions
fig, axes = plt.subplots(1, 3, figsize=(14, 4))
for ax, col in zip(axes, ["tenure", "MonthlyCharges", "TotalCharges"]):
    sns.histplot(df[col], bins=40, ax=ax)
    ax.set_title(col)

# 3. Churn rate by category (the "money" chart)
sns.barplot(data=df, x="InternetService", y=(df["Churn"] == "Yes").astype(int))
plt.title("Churn rate by internet service")

# 4. Correlation among numerics
sns.heatmap(df[["tenure", "MonthlyCharges", "TotalCharges"]].corr(), annot=True)
\`\`\`

**What EDA typically reveals (and why it's worth doing):**
- **Imbalance:** ~27% churn — real, but the model must not just predict "No" all the time (we'll measure with more than accuracy).
- **Tenure is the single most important driver**: customers churn mostly in < 12 months. New customers are high-risk.
- **Fiber optic internet churns far more** than DSL — probably a service-quality signal.
- \`TotalCharges\` and \`MonthlyCharges\` are **highly correlated**, so keeping both is redundant → we'll drop one in wrangling.

**Rule:** an EDA chart that doesn't lead to a *decision about the roadmap* is decoration. Every chart above pointed at a concrete step: handle imbalance, build a tenure feature, drop a redundant column.`
        },
        {
            number: 5,
            title: "Step 4: Data Wrangling (Cleaning)",
            content: `Wrangling = turning messy reality into a clean, typed table the model can ingest. Here we fix the classic **object-typed numeric** problem and drop IDs.

\`\`\`python
# 1) TotalCharges was parsed as text because of a few empties -> coerce to float
df["TotalCharges"] = pd.to_numeric(df["TotalCharges"], errors="coerce")

# 2) Check the coercion created NaN (from the empties)
print("NaN after coercion:", df["TotalCharges"].isnull().sum())

# 3) Drop the ID column (7043 unique values — not a predictor, just a key)
df = df.drop(columns=["customerID"])

# 4) Fill the few remaining total-charge NaNs for zero-tenure customers with 0
df["TotalCharges"] = df["TotalCharges"].fillna(0)

# 5) Drop the near-duplicate highly-correlated column
df = df.drop(columns=["TotalCharges"])

# 6) Re-verify cleanliness
print(df.isnull().sum().sum())   # 0 missing
print(df.dtypes.tail())
\`\`\`

**Wrangling rules we applied:**
- **Coerce** text-to-number (not drop) so we keep rows.
- **Handle the missing** by domain logic (0 tenure → 0 total charges), not by dropping rows blindly.
- **Drop IDs** and **redundant correlated columns** before modeling.
- **Verify after every step** — a wrangler leaves the table with zero surprises.

If we skipped this, the model would see \`TotalCharges\` as a text column (or drop rows), silently degrading a clean training set.`
        },
        {
            number: 6,
            title: "Step 5: Feature Engineering",
            content: `Models learn from what we give them. **Feature engineering** turns domain knowledge into predictive structure. For churn, domain knowledge says *tenure is king* and *short vs long stay* differ — so we build a few engineered features.

\`\`\`python
import numpy as np

# 1) Tenure is the biggest driver — bucket it so the model captures the cliff
df["TenureBand"] = pd.cut(
    df["tenure"],
    bins=[-1, 6, 12, 24, 48, 73],
    labels=["<6m", "7-12m", "13-24m", "25-48m", "49m+"],
)

# 2) Average revenue per month of tenure — a loyalty/profitability proxy
df["RevPerTenure"] = df["MonthlyCharges"] / np.where(df["tenure"] == 0, 1, df["tenure"])

# 3) A "is this a brand-new customer" flag
df["IsNew"] = (df["tenure"] <= 6).astype(int)

# 4) Encode the target to 1/0 for modeling
df["churn_target"] = (df["Churn"] == "Yes").astype(int)
\`\`\`

**Why engineer before splitting:** whenever a feature computes a *global statistic* (like a mean or a median), it must be computed using **only the training rows** — and applied with \`fit_transform\` on train and \`transform\` on test, never \`fit\` on test. This prevents **data leakage**. (Our features here are per-row \`cut\`/division, which is safe; but if we centered by a mean, we'd fit only on train.)`
        },
        {
            number: 7,
            title: "Step 6: Split into Train / Validation / Test",
            content: `Now we carve the data into **three sets**: train (to fit), validation (to tune + choose), test (to judge — used ONCE at the end).

\`\`\`python
from sklearn.model_selection import train_test_split

X = df.drop(columns=["Churn", "churn_target"])
y = df["churn_target"]  # 0/1

# 60/20/20 via two splits, stratified so class balance is kept in every split
X_tr, X_tmp, y_tr, y_tmp = train_test_split(
    X, y, test_size=0.4, stratify=y, random_state=42
)
X_val, X_test, y_val, y_test = train_test_split(
    X_tmp, y_tmp, test_size=0.5, stratify=y_tmp, random_state=42
)

print(X_tr.shape, X_val.shape, X_test.shape)
\`\`\`

**Why stratify?** Because only ~27% churn, a random split could accidentally give the validation set 10% or 40% churn, distorting metrics. We force every split to keep the same ~27% mix.

**Three sets, three jobs:**
- **Train** — the model fits here.
- **Validation** — we try models, tweak hyperparameters, and decide which one wins.
- **Test** — a single final score. If we tune on test, we overfit to it and lose an honest verdict. Use it once, at the end.

**Preprocessing note:** encoders/scalers must be \`fit\` on \`X_tr\` only, then \`transform\` the validation and test sets. Same reason as the golden rule — no leakage.`
        },
        {
            number: 8,
            title: "Step 7: Modeling — From Simple Baseline to Gradient Boosting",
            content: `Start **simple**, then fight upward. A dummy predictor sets the floor (predict the most likely class). Then we step complexity, comparing honestly on **validation**.

\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score, roc_auc_score, precision_score, recall_score

def evaluate(model, Xa, ya, Xb, yb):
    model.fit(Xa, ya)
    pred = model.predict(Xb)
    return {
        "AUC":  roc_auc_score(yb, model.predict_proba(Xb)[:, 1]),
        "Acc":  accuracy_score(yb, pred),
        "Prec": precision_score(yb, pred),
        "Rec":  recall_score(yb, pred),
    }

results = {}
results["Baseline (majority)"] = {"AUC": 0.5, "Acc": 1 - y_val.mean(), "Prec": 0, "Rec": 0}
for name, mdl in [
    ("Logistic Regression", LogisticRegression(max_iter=2000)),
    ("Random Forest",       RandomForestClassifier(n_estimators=200, random_state=42)),
    ("Gradient Boosting",   GradientBoostingClassifier(random_state=42)),
]:
    results[name] = evaluate(mdl, X_tr_num, y_tr, X_val_num, y_val)

print(pd.DataFrame(results).T.round(3))
\`\`\`

*(Here \`X_tr_num\` / \`X_val_num\` are the one-hot-encoded + scaled versions built in Step 6 — all features numeric, scaled.)*

**Reading the comparison:**
- **Baseline** accuracy (~73%) — a dumb "everyone stays" predictor. Any real model must beat this.
- **Logistic regression** gives an interpretable, stable baseline — usually AUC ~0.82+.
- **Random forest** captures the nonlinear tenure effect — AUC ~0.85.
- **Gradient boosting** usually ekes out the top AUC ~0.88 — but is the least interpretable.

**The right move is not "pick the highest AUC"** — it's "pick the model with the best *business* trade-off." We settle that in Step 9.`
        },
        {
            number: 9,
            title: "Step 8: Tuning the Best Model",
            content: `We keep the strongest candidate (gradient boosting) and **tune** its hyperparameters using cross-validation on the **train** set — still without touching test.

\`\`\`python
from sklearn.model_selection import GridSearchCV

param_grid = {
    "n_estimators": [100, 200],
    "learning_rate": [0.05, 0.1],
    "max_depth": [3, 4],
}
gs = GridSearchCV(
    GradientBoostingClassifier(random_state=42),
    param_grid,
    cv=5,              # internal CV on the TRAIN carve only
    scoring="roc_auc",
    n_jobs=-1,
)
gs.fit(X_tr_num, y_tr)
best = gs.best_estimator_
print("Best params:", gs.best_params_)
print("Best CV AUC:", round(gs.best_score_, 4))
\`\`\`

**Why GridSearch runs inside the train, not validation:** the validation set is still kept as an honest holdout for guiding model *choice*. The CV pass estimates how hyperparameters change performance. Test is never part of tuning.

**The danger we're avoiding:** if you tune on the same data you "final-score" on, your wins are tuned to noise. Keeping test clean gives the one trustworthy verdict.`
        },
        {
            number: 10,
            title: "Step 9: Finalizing the Model & Choosing a Threshold",
            content: `GridSearch gives the *best-scoring* config. But "best by AUC" is not always "best for the business." For churn, the cost of a **false positive** (offer a discount to a customer who wasn't leaving) is far lower than a **false negative** (lose a customer we could have saved). So recall matters more than raw accuracy — we finalize with a deliberate decision threshold.

\`\`\`python
from sklearn.metrics import precision_recall_curve

# For the tuned model on VALIDATION, pick a threshold that raises recall
proba_val = best.predict_proba(X_val_num)[:, 1]
precision_v, recall_v, thresholds = precision_recall_curve(y_val, proba_val)

target_recall = 0.6
chosen_thresh = None
chosen_prec = 0.0
for p, r, t in zip(precision_v, recall_v, thresholds):
    if r >= target_recall:
        chosen_prec = p
        chosen_thresh = t
        break
print("Threshold:", round(chosen_thresh, 3), "Precision:", round(chosen_prec, 3))
\`\`\`

**The final model** = tuned \`GradientBoosting\` + the chosen threshold. The decision boundary is now "flag this customer if probability ≥ 0.4" instead of the blunt 0.5 — we catch more real churners at a small precision cost.

Only **now** do we responsibly touch the test set — one number, the honest out-of-sample verdict (AUC, recall, and an estimated dollars-saved). We never tune again after this.`
        },
        {
            number: 11,
            title: "Step 10: Feature Importance & Interpretability",
            content: `A black box is hard to ship. We pair the prediction with **why**, so the business can act on it — this is where interpretability lives.

\`\`\`python
import matplotlib.pyplot as plt
import pandas as pd

imp = pd.Series(best.feature_importances_, index=X_tr_num.columns)
imp.sort_values().tail(8).plot.barh(figsize=(8, 5))
plt.title("Gradient-Boosting Feature Importance")
plt.tight_layout()
plt.show()
\`\`\`

**What it says:** \`tenure\`, \`MonthlyCharges\`, and the \`IsNew\` flag dominate — which matches the EDA. The model isn't surprising; it's actionable. SHAP per-customer values go further: for customer X, \`tenure=2m\` and \`Fiber optic=Yes\` push churn up. That is a *self-explaining*, actionable prediction.

**Why it matters for the business:** a clean interpretation lets the retention team design a *targeted offer* ("extend a 3-month hold for fiber customers under 6 months"), not send a broad discount.`
        },
        {
            number: 12,
            title: "Step 11: Deployment-Ready Pipeline & Full Recap",
            content: `Finally we wrap the whole thing into a single **function the business can call** on each new customer, and recap the full flow.

\`\`\`python
def predict_churn(raw_row):
    # raw_row: dict of the new customer's fields
    row = preprocess_one(raw_row)            # same coercions + one-hot as training
    prob = best.predict_proba(row)[0, 1]
    return {"churn_probability": round(float(prob), 3),
            "flagged": bool(prob >= chosen_thresh)}

# example call from the CRM
new_customer = {"tenure": 4, "InternetService": "Fiber optic",
                "MonthlyCharges": 89, "TotalCharges": 320}
print(predict_churn(new_customer))
\`\`\`

**The full pipeline recap:**

\`\`\`mermaid
flowchart LR
    A[Data ingest] --> B[Pandas DataFrame]
    B --> C[EDA]
    C --> D[Wrangle & engineer features]
    D --> E[Train / Validation / Test]
    E --> F[Baseline, LR, RF, GBT]
    F --> G[Tune on validation]
    G --> H[Judge on test ONCE]
    H --> I[Pick threshold for business]
    I --> J[Ship as a callable function]
    J --> K[Monitor drift over time]
\`\`\`

**Lessons of a complete project:**
- Get data → load to a typed DataFrame.
- EDA to find the *directions*; wrangle to clear them.
- Engineer features to *encode domain* — one-hot and scale for the model.
- **Never leak**: fit preprocessors on train only, tune only on validation, use test once.
- Start baseline → simple → complex; tune the winner.
- Pick the model by *business loss* and a *threshold*, not blind best-AUC.
- Package into a callable and monitor it. A deployed model is a product that needs refresh — not an exam you finish once.`
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What is the purpose of a train / validation / test split in a machine-learning project?",
            answer: "To use train for fitting, validation for choosing and tuning models, and a held-out test for ONE honest final evaluation. Splitting prevents the model from memorizing data and gives an honest estimate of how it will behave on new customers."
        },
        {
            number: 2,
            difficulty: "easy",
            question: "Why use 'stratify=y' when splitting an imbalanced churn dataset?",
            answer: "Plain random splits can accidentally give the validation or test sets a different churn rate than the population, distorting evaluation. Stratification keeps the same ~27% churn proportion in every split."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "What is data leakage in a machine-learning project, and how do you avoid it?",
            answer: "Leakage is when information from the test set influences training, making scores look better than reality. Avoid it by fitting any scaler, imputer, or encoder only on train and applying the same trained transform to validation/test; never compute a feature mean on the full dataset; and never tune on the test set."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "Why might you pick a model with lower AUC if recall is what the business actually cares about?",
            answer: "AUC summarizes ranking across all thresholds, which does not map directly to dollar cost. In churn, false negatives are expensive, so you raise recall by lowering the decision threshold — even if this lowers precision and gross accuracy — because every kept customer pays a subscription."
        },
        {
            number: 5,
            difficulty: "hard",
            question: "Describe the standard sequence of steps a Data Scientist follows to take a raw dataset to a deployed model.",
            answer: "1) Acquire data and load it into a typed DataFrame. 2) EDA (distributions, missingness, correlations) to find the salient points. 3) Data wrangling to coerce types and clear nulls/duplicates. 4) Feature engineering and a stratified train/val/test split. 5) Fit a simple baseline, then candidates (linear → forest → boosting). 6) Tune the winner on validation with cross-validation. 7) Choose a threshold by business cost, then evaluate once on the held-out test. 8) Package a callable inference, deploy, and monitor for drift."
        },
        {
            number: 6,
            difficulty: "medium",
            question: "What does a confusion-matrix analysis add beyond accuracy for an imbalanced churn model?",
            answer: "Accuracy hides that a model which always predicts the majority class is ~73% 'right'. A confusion matrix and derived precision/recall/F1 show whether the model actually catches churners, and which failure costs more — letting you tune the threshold accordingly."
        },
        {
            number: 7,
            difficulty: "medium",
            question: "Why is it important to inspect feature importance in a model you plan to ship?",
            answer: "It provides interpretability and business actionability: it tells the team which levers actually drive churn (e.g., tenure, monthly spend). It also validates the model is learning sense rather than spurious correlation, and it guides what data to collect better in the future."
        },
        {
            number: 8,
            difficulty: "hard",
            question: "A model scores 0.90 AUC on validation but 0.72 AUC on the held-out test. What likely happened and what do you do?",
            answer: "This gap signals overfitting or leakage in the validation loop. You likely tuned hyperparameters on the validation set too many times (fitting to its noise), or a feature leaked information. Fix: reduce the number of choices, use nested cross-validation, re-run WITHOUT touching test until the two scores are close."
        }
    ]
};

if (typeof window !== 'undefined') {
    window.mlProjectData = mlProjectData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = mlProjectData;
}