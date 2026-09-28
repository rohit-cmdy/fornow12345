import { PIPELINE } from '../data/mockData.js';

export default function DetectionPipeline() {
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Multimodal Detection Pipeline</h2>
      </div>
      <div className="pipeline-row">
        {PIPELINE.map((step, i) => (
          <div className={`pipeline-step tone-${step.tone}`} key={step.name}>
            <span className="pipeline-name">{step.name}</span>
            <span className="pipeline-sub">{step.sub}</span>
            <span className="pipeline-detail">{step.detail}</span>
            {i < PIPELINE.length - 1 && <span className="pipeline-arrow">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
