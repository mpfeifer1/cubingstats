import { Option } from "react-multi-select-component"

export enum CrossColor {
    White = 'White',
    Yellow = 'Yellow',
    Red = 'Red',
    Orange = 'Orange',
    Blue = 'Blue',
    Green = 'Green'
}

export enum StepName {
    Cross = 'Cross',
    F2L_1 = 'F2L_1',
    F2L_2 = 'F2L_2',
    F2L_3 = 'F2L_3',
    F2L_4 = 'F2L_4',
    OLL = 'OLL',
    PLL = 'PLL',

}

export interface Filters {
    crossColors: CrossColor[],
    startDate: Date,
    endDate: Date,
    slowestTime: number,
    fastestTime: number
}

export interface Step {
    time: number,
    executionTime: number,
    recognitionTime: number,
    turns: number,
    tps: number,
    moves: string
}

export interface Solve {
    time: number,
    date: Date,
    crossColor: CrossColor,
    scramble: string,
    tps: number,
    inspectionTime: number,
    recognitionTime: number,
    executionTime: number,
    turns: number,
    steps: {
        cross: Step,
        f2l_1: Step,
        f2l_2: Step,
        f2l_3: Step,
        f2l_4: Step,
        oll: Step,
        pll: Step
    }
}

export interface AppState {
    solves: Solve[]
}

export interface FilterPanelProps {
    solves: Solve[]
}

export interface FilterPanelState {
    allSolves: Solve[],
    filteredSolves: Solve[],
    filters: Filters,
    chosenColors: Option[] // TODO: probably change this
}

export interface FileInputProps {

}

export interface FileInputState {
    solves: Solve[]
}

export interface ChartPanelProps {
    solves: Solve[]
}

export interface ChartPanelState {

}