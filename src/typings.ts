export interface IProblem {
    Id: number;
    Name: string;
    StatementUrl: string;
    CollectionId: number;
    TestsCount: number;
    PretestsCount: number;
    InternalProblemId: string;
    ResourceLimits: {
      TimeLimitMillis: number,
      MemoryLimitBytes: number
    };
}

export interface ICollection {    
    Id: number;
    Name: string;
    Description: string;
    ProblemCount: number;
    Problems: IProblem[];
}