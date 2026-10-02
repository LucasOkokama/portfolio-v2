import type { SvgIconComponent } from '@/types/icons.type';
import CSSIcon from './css.svg';
import DockerIcon from './docker.svg';
import EclipseIcon from './eclipse.svg';
import ExpressIcon from './express.svg';
import GitIcon from './git.svg';
import Html5Icon from './html5.svg';
import IntelliJIdeaIcon from './intellij-idea.svg';
import JavaIcon from './java.svg';
import JavascriptIcon from './javascript.svg';
import MysqlIcon from './mysql.svg';
import NextJSIcon from './next-js.svg';
import NodeJSIcon from './node-js.svg';
import PandasIcon from './pandas.svg';
import PlotlyIcon from './plotly.svg';
import PostgresqlIcon from './postgresql.svg';
import PostmanIcon from './postman.svg';
import PythonIcon from './python.svg';
import ReactIcon from './react.svg';
import SpringBootIcon from './spring-boot.svg';
import TailwindCSSIcon from './tailwind-css.svg';
import TypescriptIcon from './typescript.svg';
import VisualStudioCodeIcon from './visual-studio-code.svg';

export const techsIcons = {
  css: CSSIcon,
  docker: DockerIcon,
  eclipse: EclipseIcon,
  express: ExpressIcon,
  git: GitIcon,
  html5: Html5Icon,
  intellijIdea: IntelliJIdeaIcon,
  java: JavaIcon,
  javascript: JavascriptIcon,
  mysql: MysqlIcon,
  nextJS: NextJSIcon,
  nodeJS: NodeJSIcon,
  pandas: PandasIcon,
  plotly: PlotlyIcon,
  postgresql: PostgresqlIcon,
  postman: PostmanIcon,
  python: PythonIcon,
  react: ReactIcon,
  springBoot: SpringBootIcon,
  tailwindCSS: TailwindCSSIcon,
  typescript: TypescriptIcon,
  visualStudioCode: VisualStudioCodeIcon,
} satisfies Record<string, SvgIconComponent>;
