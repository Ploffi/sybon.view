export interface IProblem extends ISelectable {
    id: string;
    name: string;
    statementUrl: string;
    collectionId: string;
    testsCount: number;
    pretests: any[];
    internalProblemId: string;
    resourceLimits: {
      timeLimitMillis: number,
      memoryLimitBytes: number
    };
}

export interface ICollection extends ISelectable {    
    id: number;
    name: string;
    description: string;
    problemsCount: number;
    problems: IProblem[]; //Сейчас с сервера на запрос по всем коллекциям приходит пустое поле, 
                          //чтобы подтащить задачи нужно запросить информацию о конкретной коллекции по id
}

export interface ISelectable {
    isSelected?: boolean;
}

export interface AuthResult {
    userId: string;
    key: string;
    expiresIn: number;
}