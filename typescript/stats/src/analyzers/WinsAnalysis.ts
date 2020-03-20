import { Analyzer } from '../Summary';
import { MatchData } from '../MatchData';
import { MatchResult } from '../MatchResult';

export class WinsAnalysis implements Analyzer {
  constructor(public team: string) {}

  run(matches: MatchData[]): string {
    const winsNumber = matches.reduce(
      (wins: number, match: MatchData) =>
        (match[1] === 'Man United' && match[5] === MatchResult.HomeWin) ||
        (match[2] === 'Man United' && match[5] === MatchResult.AwayWin)
          ? wins + 1
          : wins,
      0
    );
    return `${this.team} won ${winsNumber} games`;
  }
}
