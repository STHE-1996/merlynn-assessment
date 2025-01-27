interface ModelResponse {
    data: {
      type: string;
      id: string;
      attributes: ModelAttributes;
      exclusions: ExclusionRules;
      publisher: string;
      'publish-date': string;
      measurements: Measurements;
    };
  }

  interface ModelAttributes {
    name: string;
    description: string;
    metadata: Metadata;
    exclusions: ExclusionRules;
  }
  
  interface Metadata {
    prediction: Prediction;
    attributes: Attribute[];
  }
  

  interface Prediction {
    domain: Domain;
    name: string;
    question: string;
    type: string;
  }
  

  interface Domain {
    type: string;
    values: string[];
  }
  
 
  interface Attribute {
    domain: Domain | ContinuousDomain;
    name: string;
    question: string;
    type: string;
  }
  
  interface ContinuousDomain {
    discrete: boolean;
    interval: number;
    lower: number;
    upper: number;
    type: string;
  }
 
  interface ExclusionRules {
    rules: ExclusionRule[];
  }
  

  interface ExclusionRule {
    type: string;
    antecedent: ExclusionAntecedent | ExclusionAntecedent[];
    consequent: ExclusionConsequent | ExclusionConsequent[];
    relation?: ExclusionRelation;
  }
  
 
  interface ExclusionAntecedent {
    index: number;
    threshold: string;
    type: string;
  }
  

  interface ExclusionConsequent {
    type: string;
    value?: string;
  }
  

  interface ExclusionRelation {
    index: number;
    threshold: number;
    type: string;
  }
  
  
  interface Measurements {
    levers: Lever[];
    oob_error: number;
  }
  
  
  interface Lever {
    drop: number;
    index: number;
  }
  
  interface ErrorDetails {
    title: string;
    detail: string;
  }
  
  interface ErrorResponse {
    errors: {
      title: string;
      detail: string;
      status: number;
      rules: Array<{
        antecedent: Array<{ index: number; threshold: string; type: string }>;
        consequent: Array<{ index: number; threshold: string; type: string }>;
        type: string;
      }>;
    }[];
  }
  