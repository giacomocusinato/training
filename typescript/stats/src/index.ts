import { CSVFileReader } from './CSVFileReader';
import { MatchResult } from './MatchResult';
import { MatchReader } from './MatchReader';
import { WinsAnalysis } from './analyzers/WinsAnalysis';
import { ConsoleReport } from './reportTarget/ConsoleReport';
import { Summary } from './Summary';
import { HtmlReport } from './reportTarget/HtmlReport';

const csvFileReader = new CSVFileReader('data.csv');
const matchReader = new MatchReader(csvFileReader);
matchReader.load();

const arsenalSummary = new Summary(
  new WinsAnalysis('Arsenal'),
  new ConsoleReport()
);
arsenalSummary.buildAndReport(matchReader.matches);

const chelseaSummary = new Summary(
  new WinsAnalysis('Chelsea'),
  new HtmlReport()
);
chelseaSummary.buildAndReport(matchReader.matches);

const spurSummary = Summary.winsAnalysiswithHtmlReport('Tottenham');
spurSummary.buildAndReport(matchReader.matches);
