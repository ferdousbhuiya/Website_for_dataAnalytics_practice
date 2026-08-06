const deepLearningData = {
    title: "Deep Learning",
    metadata: {
        track: 'data-scientist',
        category: 'ML',
        icon: '🧠',
        description: "An introduction to neural networks, their architectures, and their applications."
    },
    lessons: [
        {
            number: 1,
            title: "What is a Neural Network?",
            content: `A neural network is a series of algorithms that tries to recognize underlying relationships in data by passing signals through **layers of simple units (neurons)**, each transforming a weighted sum of its inputs through a nonlinear activation.

**Core anatomy:**
- **Input layer:** the raw features (pixels, prices, embeddings).
- **Hidden layers:** learn increasingly abstract representations (edges → shapes → faces).
- **Output layer:** produces the prediction (a class, a probability, a value).

**The forward pass flow:**

\`\`\`mermaid
graph LR
    A[Input x] --> H1[Hidden layer 1]
    H1 --> H2[Hidden layer 2]
    H2 --> O[Output layer]
    O --> L[Loss]
    A --> L[Loss y_true]
\`\`\`

Each neuron computes \`z = Σ wᵢxᵢ + b\` then \`a = activation(z)\`. "Deep" simply means *many* stacked hidden layers — depth is what lets the network learn hierarchy.`
        },
        {
            number: 2,
            title: "The Perceptron and Why We Need Depth",
            content: `A **perceptron** is the simplest building block: it takes weighted inputs, sums them, applies a step/threshold function, and emits 0 or 1. One perceptron = a linear decision boundary — a single line in 2D, a plane in higher dimensions.

- It can't solve problems that need a nonlinear boundary, like the XOR problem.
- Stacking layers of neurons into a network solves this: each layer transforms the representation, and the final one can carve arbitrary nonlinear regions.

\`\`\`mermaid
flowchart TD
    subgraph Perceptron
        X1 --> W[Σ w·x + b]
        X2 --> W
        X3 --> W
        W --> S{Step}
        S --> O[0 or 1]
    end
    subgraph Network
        H1[Hidden] --> H2[Hidden]
        H2 --> Out[Output]
    end
\`\`\`

Rule: one perceptron = one straight line; a deep network = many bends composed into a powerful decision surface.`
        },
        {
            number: 3,
            title: "Activation Functions: ReLU, Sigmoid, Tanh",
            content: `Activation functions introduce **nonlinearity**. Without them, any stack of layers collapses mathematically into a single linear transformation — a network with 20 layers would still be a line.

**The big three:**

| Function | Formula | Typical use | Gotchas |
|---|---|---|---|
| **Sigmoid** | \`1/(1+e^(-x))\` | Output probability in 0–1 | Saturates at extremes → vanishing gradient |
| **Tanh** | \`tanh(x)\` | Hidden layers, zero-centered | Same saturation problem |
| **ReLU** | \`max(0, x)\` | Default hidden activation | Dead neurons (output stuck at 0) |

\`\`\`mermaid
graph LR
    A[z = Σwᵢxᵢ + b] --> B{Activation}
    B -->|Sigmoid| C[(0,1) probabilities]
    B -->|Tanh| D[(-1,1) zero-centered]
    B -->|ReLU| E[0 or linear, fast]
\`\`\`

**Practical picks:** ReLU (+ variants like Leaky ReLU) for hidden layers, softmax for multi-class output, sigmoid for a single binary probability. Tanh appears in RNN/LSTM gates.`
        },
        {
            number: 4,
            title: "Loss Functions and Gradient Descent",
            content: `A **loss function** quantifies how wrong the model is; training is just minimizing it.

**Common losses by task:**
- **Regression:** mean squared error (MSE) — heavily penalizes large errors; MAE more robust to outliers.
- **Binary classification:** binary cross-entropy (log loss) — measures divergence between predicted and true probabilities.
- **Multi-class:** categorical cross-entropy.

**Gradient descent** walks downhill along the loss surface: \`w ← w - η · ∂L/∂w\`.

- **η (learning rate)** controls step size: too large → diverges; too small → snail-paced training.
- **Stochastic GD** uses one sample per update (noisy, fast); **mini-batch** uses small batches (the practical default).

\`\`\`mermaid
graph LR
    A[Initialize weights] --> B[Forward: predict ŷ]
    B --> C[Loss L ŷ, y]
    C --> D[Backward: gradient ∂L/∂w]
    D --> E[Update w ← w - η·gradient]
    E -->|repeat| B
    E --> F[Converged / early stop]
\`\`\``
        },
        {
            number: 5,
            title: "Backpropagation: The Chain Rule in Action",
            content: `**Backpropagation** computes the gradient of the loss with respect to *every* weight efficiently, by applying the **chain rule from the output backward** through the network. It's how gradient descent knows which direction to move each weight.

**Why "back"?** Errors propagate backward: compute the gradient of the loss w.r.t. the output layer's weights first, then use those to get the hidden layer's gradients, layer by layer. The key quantity is \`∂L/∂wᵢ = ∂L/∂a · ∂a/∂z · ∂z/∂wᵢ\`.

**The training loop:**

\`\`\`mermaid
flowchart TD
    A[Forward pass] --> B[Compute loss]
    B --> C[Backward pass]
    C --> D[Gradients at each layer]
    D --> E[Update weights]
    E --> F{Converged?}
    F -->|No| A
    F -->|Yes| G[Trained model]
\`\`\`

Two failure modes to know: **vanishing gradients** (deep networks, sigmoid/tanh — early layers get tiny updates) and **exploding gradients** (large updates, unstable training). ReLU, skip connections, and gradient clipping are the usual fixes.`
        },
        {
            number: 6,
            title: "Overfitting in Deep Learning: Dropout and Early Stopping",
            content: `With enough parameters, neural networks are powerful memorizers — they'll happily store training noise and generalize poorly.

**Signs of overfitting:** training loss keeps dropping while validation loss starts rising. **You evaluate on validation, never on training.**

**The best defenses in deep learning:**
1. **More data** (and data augmentation).
2. **Dropout:** randomly switch off a fraction of neurons each batch → the network can't rely on single neurons.
3. **Early stopping:** stop training when validation loss stops improving (patience parameter).
4. **Weight decay / L2 regularization:** keeps weights small.
5. **Reduce capacity** (fewer layers/units).

\`\`\`mermaid
graph TD
    A[Train & validate] --> B{Validation improving?}
    B -->|Yes| C[Keep training]
    B -->|No, plateaus| D{Patience exceeded?}
    D -->|No| C
    D -->|Yes| E[Stop & restore best weights]
    C --> A
\`\`\`

The dashed secret: monitor **validation** metrics, not training metrics, for every early-stop and dropout decision.`
        },
        {
            number: 7,
            title: "CNN and RNN/LSTM Basics",
            content: `Two specialized architectures dominate real-world deep learning.

**CNN (Convolutional Neural Network)** — built for spatial structure (images):
- A **convolution filter** slides across the input, detecting local patterns (edges, textures).
- **Pooling** downsamples (max-pooling takes the max in a window) → translation invariance and less compute.
- Deep CNNs stack filters into a feature hierarchy.

**RNN / LSTM** — built for sequences (text, audio, time series):
- An **RNN** passes a hidden state \`hₜ\` forward through time; each step uses the previous state + current input.
- **LSTM** adds gates (input/forget/output) with a cell state to remember information over long gaps — fighting the vanishing-gradient problem.

\`\`\`mermaid
graph TD
    subgraph CNN
        C1[Convolution] --> C2[Pooling]
        C2 --> C3[Dense]
        C3 --> C4[Softmax]
    end
    subgraph RNN
        R1[Input t] --> R2[Cell] --> R3[Output t]
        R2 --> R4[hidden state to t+1]
    end
\`\`\`

**Choosing between them:** images → CNN; sequences/temporal order → RNN/LSTM; tabular → start classical.`
        },
        {
            number: 8,
            title: "Deep Learning vs. Classical ML: Which to Choose?",
            content: `Neural networks aren't always the right tool. Deciding well separates strong practitioners from tool-fanatics.

**Choose deep learning when:**
- You have **lots of data** (tens of thousands to millions of examples).
- The input is **unstructured**: images, audio, free text, video.
- Patterns are too complex for hand-engineered features (raw pixels beat manually invented features).

**Choose classical ML (linear/logistic, trees, gradient boosting) when:**
- Data is **tabular and structured** (most business tables).
- You need **interpretability** (regulatory, audit, stakeholder trust).
- You have **small data** — deep models overfit or underperform.
- You need speed and low infrastructure cost.

\`\`\`mermaid
flowchart TD
    A{Data type?} -->|Tabular / small| B[Classical ML: trees, logistic]
    A -->|Images / text / audio| C{Data volume?}
    A -->|Sequences| R[RNN/LSTM]
    C -->|Huge| D[Deep learning]
    C -->|Small| E[Classical + feature engineering]
    B --> F{Need interpretability?}
    F -->|Yes| G[Keep linear/trees]
\`\`\`

Rule of thumb: start simple, measure a baseline, then add complexity only when it earns its cost.`
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What is the purpose of an activation function in a neural network?",
            answer: "To introduce non-linearity. Without activation functions, stacked linear layers would collapse into a single linear transformation, so the network could never learn nonlinear relationships like XOR, images, or complex decision boundaries."
        },
        {
            number: 2,
            difficulty: "easy",
            question: "What is the difference between a hidden layer and the output layer?",
            answer: "Hidden layers sit between input and output and learn abstract internal representations of the data. The output layer produces the final prediction — probabilities via softmax/sigmoid for classification, or a scalar for regression."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "Why does sigmoid/tanh cause vanishing gradients in deep networks, and why is ReLU preferred?",
            answer: "Sigmoid and tanh saturate at extremes — their gradients approach 0, so in deep networks the gradient shrinks multiplicatively layer-by-layer and early weights barely update. ReLU has a constant gradient of 1 for positive inputs, so signals propagate much better. Only downsides: ReLU can dead-end at 0 for negative inputs (Leaky ReLU fixes that)."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "What role does the learning rate play in gradient descent, and what happens if it's too large or too small?",
            answer: "Learning rate (η) is the step size for weight updates: w ← w - η·gradient. Too large → the optimizer oscillates or diverges and loss may blow up. Too small → training is very slow or stalls in a local minimum. Practically: use a schedule or an adaptive optimizer (Adam) and monitor the loss curve."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "How would you detect overfitting in a neural network and what are the two most effective early mitigations?",
            answer: "Detect it by comparing training vs. validation loss over epochs: if training loss keeps dropping while validation loss plateaus or rises, you're overfitting. The two most effective fixes are more data (or augmentation) and regularization — dropout, early stopping, or weight decay."
        },
        {
            number: 6,
            difficulty: "hard",
            question: "Explain in a few steps how backpropagation computes gradients for all weights in the network.",
            answer: "Backpropagation applies the chain rule backward: (1) do a forward pass and compute the loss; (2) compute the gradient of loss w.r.t. the output activations; (3) for each layer from output to input, compute the partial derivative of the loss w.r.t. that layer's weights using the gradient passed back from the next layer: ∂L/∂w = ∂L/∂a · ∂a/∂z · ∂z/∂w; (4) pass the ∂L/∂x gradient to the previous layer. This reuses shared computations and gives an exact gradient per weight in one backward sweep."
        },
        {
            number: 7,
            difficulty: "hard",
            question: "Why is max-pooling common in CNNs and what trade-off does it make?",
            answer: "Max-pooling downsamples a feature map by taking the max over small windows, which gives small translation invariance (a feature found slightly elsewhere still triggers the max), reduces computation and parameter count, and increases receptive field per layer. The trade-off is loss of spatial precision — you lose exact location information, which is fine for classification but not ideal for pixel-exact segmentation tasks."
        },
        {
            number: 8,
            difficulty: "hard",
            question: "What problem do LSTMs solve beyond plain RNNs, and how do the gates help?",
            answer: "Plain RNNs suffer from vanishing gradients over long sequences — they forget distant context. LSTMs add a cell state (a memory line) and three gates: forget (what to drop from memory), input (what to write), output (what to expose). Because the cell state flows with near-linear additive updates, gradients can propagate far back, so LSTMs learn long-range dependencies (e.g., pronoun resolution, long time-series patterns)."
        },
        {
            number: 9,
            difficulty: "medium",
            question: "When would you choose a gradient-boosted tree model over a neural network?",
            answer: "When the data is tabular and small-to-medium, when you need interpretability (feature importances, SHAP), or when speed and infrastructure cost matter. Trees handle messy structured data well and often beat deep nets on modest tables. Deep learning wins on large unstructured data like images, text, and audio."
        },
        {
            number: 10,
            difficulty: "easy",
            question: "What does a softmax output layer compute, and where is it used?",
            answer: "Softmax takes a vector of logits and converts them into a probability distribution that sums to 1 — each class gets a value between 0 and 1. It's the standard output layer for multi-class classification (e.g., classify an image as dog/cat/bird)."
        }
    ],
    caseStudyQuizzes: [
        {
            case: 1,
            scenario: "A bank has 8,000 rows of clean tabular loan data and needs a default-risk model that loan officers can explain to regulators and customers.",
            question: "Should the team use a deep neural network, and why?",
            options: [
                "Yes — deep networks always outperform on structured data",
                "Yes — 8,000 rows is plenty for a 10-layer network",
                "No — with small tabular data and an interpretability requirement, gradient-boosted trees or logistic regression are the better choice",
                "No — only decision trees can handle missing values"
            ],
            answer: "Correct Option: No — with small tabular data and an interpretability requirement, gradient-boosted trees or logistic regression are the better choice"
        },
        {
            case: 2,
            scenario: "While training an image classifier, the data scientist watches training loss fall to 0.01 while validation loss rises from 0.4 to 0.7 across epochs.",
            question: "What is happening, and what should be done first?",
            options: [
                "The model is underfitting — increase the number of layers",
                "The model is overfitting — apply dropout, early stopping, or gather more data",
                "The learning rate is too low — raise it to 1.0",
                "Nothing — rising validation loss is normal during training"
            ],
            answer: "Correct Option: The model is overfitting — apply dropout, early stopping, or gather more data"
        }
    ]
};

if (typeof window !== 'undefined') {
    window.deepLearningData = deepLearningData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = deepLearningData;
}