import type { SvgIconComponent } from '@/types/icons.type';
import { iconNames } from '../icons-names';
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
import StyledComponentsIcon from './styled-components.svg';
import TailwindCSSIcon from './tailwind-css.svg';
import TypescriptIcon from './typescript.svg';
import VisualStudioCodeIcon from './visual-studio-code.svg';
import ViteIcon from './vite.svg';

export const techsIcons = {
  [iconNames.techs.css]: CSSIcon,
  [iconNames.techs.docker]: DockerIcon,
  [iconNames.techs.eclipse]: EclipseIcon,
  [iconNames.techs.express]: ExpressIcon,
  [iconNames.techs.git]: GitIcon,
  [iconNames.techs.html5]: Html5Icon,
  [iconNames.techs.intellijIdea]: IntelliJIdeaIcon,
  [iconNames.techs.java]: JavaIcon,
  [iconNames.techs.javascript]: JavascriptIcon,
  [iconNames.techs.mysql]: MysqlIcon,
  [iconNames.techs.nextJS]: NextJSIcon,
  [iconNames.techs.nodeJS]: NodeJSIcon,
  [iconNames.techs.pandas]: PandasIcon,
  [iconNames.techs.plotly]: PlotlyIcon,
  [iconNames.techs.postgresql]: PostgresqlIcon,
  [iconNames.techs.postman]: PostmanIcon,
  [iconNames.techs.python]: PythonIcon,
  [iconNames.techs.react]: ReactIcon,
  [iconNames.techs.springBoot]: SpringBootIcon,
  [iconNames.techs.styledComponents]: StyledComponentsIcon,
  [iconNames.techs.tailwindCSS]: TailwindCSSIcon,
  [iconNames.techs.typescript]: TypescriptIcon,
  [iconNames.techs.visualStudioCode]: VisualStudioCodeIcon,
  [iconNames.techs.vite]: ViteIcon,
} satisfies Record<string, SvgIconComponent>;
