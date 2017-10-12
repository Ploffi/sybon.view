export interface IProblem {
    Id: string;
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
    Id: string;
    Name: string;
    Description: string;
    ProblemCount: number;
    Problems: IProblem[];
}

export interface ISelectableCollection extends ICollection {
    isSelected?: boolean;
}