import { MatchData } from './MatchData';
import { WinsAnalysis } from './analyzers/WinsAnalysis';
import { HtmlReport } from './reportTarget/HtmlReport';
import { match } from 'assert';

export interface Analyzer {
  run(matches: MatchData[]): string;
}

export interface OutputTarget {
  print(report: string): void;
}

export class Summary {
  static winsAnalysiswithHtmlReport(team: string) {
    return new Summary(new WinsAnalysis(team), new HtmlReport());
  }

  constructor(public analizer: Analyzer, public outputTarget: OutputTarget) {}

  buildAndReport(matches: MatchData[]): void {
    const output = this.analizer.run(matches);
    this.outputTarget.print(output);
  }
}
