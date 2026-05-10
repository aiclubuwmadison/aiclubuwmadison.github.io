import './Seminars.css';

const seminars = [
  {
    title: 'Agentic AI — How It Developed — Can You Create Your Own Agentic AI',
    displayDate: 'Nov 2025',
    date: '2025-11-01',
    tags: ['Agents', 'Safety', 'RL', 'LLM Tools'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `A compact, responsible guide to agentic AI: definitions, history (reactive systems → planners → RL → LLM+tool agents), and practical blueprints for building safe agents. We break down agent anatomy: perception, state/memory, policy/planner, tools/actuators, reward/objectives, and safety modules. The talk demonstrates three safe starter projects (reflex agent, toy RL agent, LLM-as-planner with strict tool sandboxes), discusses evaluation (task success, robustness, safety metrics), and lists engineering practices (simulators, staged rollout, human-in-the-loop, kill switches). Critical cautionary topics include specification gaming, reward hacking, access control, and legal/ethical constraints. Students leave with small, sandboxed project ideas and a safety-first roadmap to prototype agents responsibly.`,
  },
  {
    title: 'How LLMs Work — HDS Usage in Them',
    displayDate: 'Oct 2025',
    date: '2025-10-10',
    tags: ['LLMs', 'Transformers', 'HDS'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `An accessible tour of large language models (LLMs) tied to high-dimensional-statistics intuition. Topics: tokenization, embeddings, transformer blocks, pretraining/fine-tuning, decoding. HDS: concentration for embeddings, √d scaling in attention, low-rank structure, sparsity, and why overparameterization can still generalize. Practical diagnostics: probing embeddings, attention visualization, calibration, and memory/memorization issues. Includes simple code sketches (tiny attention forward pass, sampling loop, embedding nearest-neighbor). Focus: geometric intuition and pragmatic rules for scaling, normalization, and evaluation.`,
  },
  {
    title: 'Stochastic Optimization in ML',
    displayDate: 'Oct 2025',
    date: '2025-10-01',
    tags: ['Optimization', 'SGD', 'Adam'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Why stochastic optimization powers modern ML and how to use it effectively. We motivate mini-batch gradients and build intuition for noise, bias, and variance. Algorithms: SGD, momentum, Nesterov, AdaGrad/RMSprop, Adam/AdamW, and variance-reduced (SVRG). High-dimensional insights: implicit regularization, batch/learning-rate scaling, and why stochasticity can improve generalization. Demos: SGD vs Adam, LR sweeps, gradient norms. Practical recipes: LR schedules, warmup, clipping, and diagnostics for stable training.`,
  },
  {
    title: 'Transformers — How They Use Inference and HDS',
    displayDate: 'Sep 2025',
    date: '2025-09-01',
    tags: ['Transformers', 'Inference', 'HDS'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Concept-forward explanation of transformer operations (embeddings, self-attention, MHA, positional encodings, residuals/LayerNorm) and inference modes (greedy, beam, top-k/p). We connect high-dimensional statistics—concentration, scaling, low-rank approximations, sparsity—to practical behavior and approximations. Hands-on snippets include a minimal attention forward pass and a pretrained-embedding demo. Takeaways: geometric intuition and rules-of-thumb (scale & normalize, probe representations, use approximate attention judiciously).`,
  },
  {
    title: 'Probability and Stochastic Processes in Finance',
    displayDate: 'May 2025',
    date: '2025-05-01',
    tags: ['Finance', 'Probability', 'Stochastic'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Probability essentials and canonical stochastic processes for finance—random walk, Poisson process, Brownian motion, Markov chains, and GBM. Intuition for filtration, martingales, stationarity/ergodicity. Applications: GBM-based asset models, risk-neutral pricing intuition, jump-diffusion, Monte Carlo pricing, and basic volatility models (GARCH). Short Python simulations (GBM, Monte Carlo options, Poisson jumps) illuminate randomness, assumptions, and limitations (heavy tails, volatility clustering).`,
  },
  {
    title: 'Deep Learning in Biology (Genetics and Oncology)',
    displayDate: 'Apr 2025',
    date: '2025-04-01',
    tags: ['Bio', 'Genomics', 'DL'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `A primer on deep learning for genetics and cancer. Biology basics (DNA, variants, expression, tumor heterogeneity) and modalities (sequence, bulk/single-cell RNA-seq, histopathology) mapped to architectures: 1D CNNs and transformers for sequences, VAEs/autoencoders for expression denoising, GNNs for molecular/spatial interactions, and transfer learning for histology. Covers preprocessing, evaluation (patient-level splits, calibration), and ethics (privacy, consent, validation). Three compact sketches—sequence CNN, expression autoencoder, transfer-learned histology classifier—show end-to-end pipelines.`,
  },
  {
    title: 'Inference in ML',
    displayDate: 'Mar 2025',
    date: '2025-03-01',
    tags: ['Uncertainty', 'Bayesian', 'Causal'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Clarifies “inference” across ML workflows: parameter inference, predictive uncertainty, causal inference, and simulation-based inference. Tools: MLE, bootstrap, Bayesian posteriors (MCMC/VI), conformal prediction, deep ensembles, MC-dropout, and doubly-robust estimators. Emphasis on assumptions (exchangeability, no unmeasured confounding) and diagnostics (calibration, coverage, sharpness). Demos: bootstrap intervals, Bayesian linear posterior, and split-conformal wrappers.`,
  },
  {
    title: 'HDS in ML',
    displayDate: 'Feb 2025',
    date: '2025-02-01',
    tags: ['HDS', 'Regularization', 'Random Matrices'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `High-dimensional statistics (HDS) and why modern ML needs structure/regularization. Ideas: concentration, curse/blessing of dimensionality, sparsity, RIP, and random-matrix intuition. Connections to practice: LASSO recovery, covariance shrinkage, JL projections, randomized PCA, Graphical LASSO, compressed sensing. Intuitive rates like √(s log p / n) and why log p appears, with demos for LASSO and random projection.`,
  },
  {
    title: 'Deep Learning — In Finance',
    displayDate: 'Dec 2024',
    date: '2024-12-01',
    tags: ['Finance', 'DL', 'Risk'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Deep learning applications in quantitative finance with risk-aware engineering. Topics: order-book representation learning, sequence models for forecasting, CNNs for alt data, GNNs for cross-asset structure, and generative models for stress scenarios. Emphasis on costs, backtesting pitfalls, walk-forward validation, model risk, and deployment. Compact PyTorch MLP example for a minimal prediction pipeline and governance best practices.`,
  },
  {
    title: 'LangChains — Usage of Memory in ML',
    displayDate: 'Nov 2024',
    date: '2024-11-01',
    tags: ['LLMs', 'RAG', 'Memory'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `How LLM applications use memory for multi-step dialogue, stateful agents, and retrieval-augmented generation. Memory types: short-term, long-term, and episodic/working. Patterns: vector embeddings + nearest-neighbor retrieval, caches/summaries, compaction. Design trade-offs: context windows, latency vs freshness, privacy, and effects on coherence/hallucination. Demo: embeddings + FAISS retrieval in a loop with a memory-update policy. Practical takeaways: memory hygiene, retrieval quality metrics, and safe-memory practices.`,
  },
  {
    title: 'ML Maths — Hierarchical Clustering',
    displayDate: 'Oct 2024',
    date: '2024-10-05',
    tags: ['Clustering', 'Dendrograms', 'Distance'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `An intuitive, math-light introduction to hierarchical clustering. Agglomerative/divisive approaches, linkage criteria (single, complete, average, Ward), and dendrogram interpretation. Distance metrics (Euclidean, cosine, correlation), linkage effects on cluster shapes, and preprocessing (scaling, outliers, cut heights). Emphasis on algorithmic steps, computational trade-offs, and when hierarchy is preferable (interpretability, nested structure, small datasets). Includes notebook demos using scipy/sklearn and practical pitfalls (chaining, sensitivity).`,
  },
  {
    title: 'Dimensionality Reduction and PCA in ML',
    displayDate: 'Oct 2024',
    date: '2024-10-01',
    tags: ['PCA', 'SVD', 'UMAP/t-SNE'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Why reduce dimension (denoise, visualize, speed) with linear methods (PCA, truncated SVD), probabilistic PCA, and nonlinear methods (MDS, Isomap, t-SNE, UMAP). Geometric PCA interpretation, explained variance, component selection, randomized/incremental PCA. Pitfalls (centering/scaling, missing data), pipelines (preprocess, features, compression), demos for visualization and speedups, and when to use linear vs nonlinear reductions.`,
  },
];

const workshops = [
  {
    title: 'AWS SageMaker — End-to-End Training, Tuning, and Deployment',
    displayDate: 'Workshop',
    tags: ['AWS', 'SageMaker', 'SDK', 'TensorFlow', 'Tuning', 'Deploy'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Hands-on SageMaker fundamentals: create an execution role, stage code/data in S3, and use the SageMaker Python SDK to submit TensorFlow training jobs. Run small hyperparameter searches with HyperparameterTuner, package artifacts, deploy a real-time endpoint, and invoke it from a client. Emphasis on cost-conscious choices (compact instances like ml.m5.large, few epochs) and responsible lifecycle management (delete endpoints). Exercises include tweaking a minimal TF training script, running a constrained tuning job, and deploying a second model for comparison. Prereqs: AWS account/permissions and CLI; alternatives suggested for those without accounts. Outcome: execute end-to-end workflows, interpret S3 artifacts, manage endpoints safely, and apply reproducible, cost-aware practices.`,
  },
  {
    title: 'TensorFlow and Keras — Practical Deep Learning Workflow',
    displayDate: 'Workshop',
    tags: ['TensorFlow', 'Keras', 'tf.data', 'CNN', 'TensorBoard', 'TFLite'],
    speaker: 'Vardaan Kapoor, President, AI@UW',
    description: `Core TF/Keras workflow for small-scale DL: reproducible envs, efficient tf.data pipelines with augmentation, and a CNN trained on CIFAR-10. Topics: model building, training/validation, callbacks (EarlyStopping, ModelCheckpoint), saving/loading (SavedModel), and exporting for serving or conversion (TFLite). Performance/debuggability: AUTOTUNE, GPU checks, mixed precision guidance, and TensorBoard logging. Labs: build a batched augmented pipeline and train a simple CNN with checkpoints/early stopping, then export the best model. Outcome: run a reproducible training workflow, diagnose issues, export models for inference, and apply lightweight best practices.`,
  },
];

// Parse "Nov 2025" → { month: "Nov.", year: "2025" }
const splitDate = (display) => {
  const parts = display.split(' ');
  if (parts.length === 2) {
    return { month: `${parts[0]}.`, year: parts[1] };
  }
  return { month: display, year: '' };
};

const Seminars = () => {
  const sorted = [...seminars].sort((a, b) => (a.date < b.date ? 1 : -1));
  const yearsRange = '2024–25';

  return (
    <div className="atmos-root atmos-seminars">
      <div className="atmos-shell">
        {/* HERO */}
        <header className="atmos-sem-hero atmos-reveal">
          <div className="atmos-sem-eyebrow">
            <span className="atmos-section-num">III</span>
            <span className="atmos-dot" />
            <span>Seminars &amp; Workshops</span>
          </div>
          <div className="atmos-sem-hero-row">
            <h1 className="atmos-sem-title">
              <span className="atmos-sem-title-roman">An archive of</span>{' '}
              talks &amp; workshops.
            </h1>
            <div className="atmos-sem-aside">
              <span className="atmos-sem-aside-num">{sorted.length} talks</span>
              {yearsRange}
              <br />
              {workshops.length} workshops
            </div>
          </div>
        </header>

        {/* PAST SEMINARS */}
        <section>
          <div className="atmos-sem-sub">
            <div>
              <div className="atmos-sem-sub-eyebrow">
                Section 01 <em>Past Seminars</em>
              </div>
              <h2 className="atmos-sem-sub-title">Talks given by our speakers.</h2>
            </div>
            <div className="atmos-sem-sub-aside">{sorted.length} talks</div>
          </div>

          <div className="atmos-sem-cards">
            {sorted.map((s) => (
              <div className="atmos-sem-card" key={`${s.title}-${s.date}`}>
                <div className="atmos-sem-card-head">
                  <span className="atmos-sem-card-date">{s.displayDate}</span>
                  <ul className="atmos-sem-tags">
                    {s.tags.map((t) => (
                      <li className="atmos-sem-tag" key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <h3 className="atmos-sem-talk">{s.title}</h3>
                <p className="atmos-sem-speaker">{s.speaker}</p>
                <p className="atmos-sem-abstract">{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WORKSHOPS */}
        <section>
          <div className="atmos-sem-sub">
            <div>
              <div className="atmos-sem-sub-eyebrow">
                Section 02 <em>Workshops &amp; Tutorials</em>
              </div>
              <h2 className="atmos-sem-sub-title">Hands-on, applied sessions.</h2>
            </div>
            <div className="atmos-sem-sub-aside">{workshops.length} workshops</div>
          </div>

          <div className="atmos-sem-cards atmos-sem-cards--workshop">
            {workshops.map((w) => (
              <div className="atmos-sem-card atmos-sem-card--workshop" key={w.title}>
                <div className="atmos-sem-card-head">
                  <span className="atmos-sem-card-date atmos-sem-card-date--workshop">Workshop</span>
                  <ul className="atmos-sem-tags">
                    {w.tags.map((t) => (
                      <li className="atmos-sem-tag" key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <h3 className="atmos-sem-talk">{w.title}</h3>
                <p className="atmos-sem-speaker">{w.speaker}</p>
                <p className="atmos-sem-abstract">{w.description}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Seminars;
