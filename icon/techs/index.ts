import type { SvgIconComponent } from '@/types/icons.type';
import { iconNames } from '../icons-names';
import AngularIcon from './angular.svg';
import BootstrapIcon from './bootstrap.svg';
import CIcon from './c.svg';
import ChartJSIcon from './chartjs.svg';
import CSSIcon from './css.svg';
import DockerIcon from './docker.svg';
import EclipseIcon from './eclipse.svg';
import ExpressIcon from './express.svg';
import FlaskIcon from './flask.svg';
import FuseJSIcon from './fuse-js.svg';
import GitIcon from './git.svg';
import Html5Icon from './html5.svg';
import IntelliJIdeaIcon from './intellij-idea.svg';
import JavaIcon from './java.svg';
import JavaScriptIcon from './javascript.svg';
import JUnitIcon from './junit.svg';
import MatplotlibIcon from './matplotlib.svg';
import MobxIcon from './mobx.svg';
import MySQLIcon from './mysql.svg';
import NextJSIcon from './next-js.svg';
import NodeJSIcon from './node-js.svg';
import PandasIcon from './pandas.svg';
import PHPIcon from './php.svg';
import PlaywrightIcon from './playwright.svg';
import PlotlyIcon from './plotly.svg';
import PostgreSQLIcon from './postgresql.svg';
import PostmanIcon from './postman.svg';
import PythonIcon from './python.svg';
import ReactIcon from './react.svg';
import SpringBootIcon from './spring-boot.svg';
import StyledComponentsIcon from './styled-components.svg';
import SwaggerIcon from './swagger.svg';
import TailwindCSSIcon from './tailwind-css.svg';
import TypescriptIcon from './typescript.svg';
import VisualStudioCodeIcon from './visual-studio-code.svg';
import ViteIcon from './vite.svg';
import ZodIcon from './zod.svg';

export const techsIcons = {
  [iconNames.techs.angular]: AngularIcon,
  [iconNames.techs.bootstrap]: BootstrapIcon,
  [iconNames.techs.c]: CIcon,
  [iconNames.techs.chartJS]: ChartJSIcon,
  [iconNames.techs.css]: CSSIcon,
  [iconNames.techs.docker]: DockerIcon,
  [iconNames.techs.eclipse]: EclipseIcon,
  [iconNames.techs.express]: ExpressIcon,
  [iconNames.techs.flask]: FlaskIcon,
  [iconNames.techs.fuseJS]: FuseJSIcon,
  [iconNames.techs.git]: GitIcon,
  [iconNames.techs.html5]: Html5Icon,
  [iconNames.techs.intellijIdea]: IntelliJIdeaIcon,
  [iconNames.techs.java]: JavaIcon,
  [iconNames.techs.javaScript]: JavaScriptIcon,
  [iconNames.techs.jUnit]: JUnitIcon,
  [iconNames.techs.matplotlib]: MatplotlibIcon,
  [iconNames.techs.mobX]: MobxIcon,
  [iconNames.techs.mySQL]: MySQLIcon,
  [iconNames.techs.nextJS]: NextJSIcon,
  [iconNames.techs.nodeJS]: NodeJSIcon,
  [iconNames.techs.pandas]: PandasIcon,
  [iconNames.techs.php]: PHPIcon,
  [iconNames.techs.playwright]: PlaywrightIcon,
  [iconNames.techs.plotly]: PlotlyIcon,
  [iconNames.techs.postgreSQL]: PostgreSQLIcon,
  [iconNames.techs.postman]: PostmanIcon,
  [iconNames.techs.python]: PythonIcon,
  [iconNames.techs.react]: ReactIcon,
  [iconNames.techs.springBoot]: SpringBootIcon,
  [iconNames.techs.styledComponents]: StyledComponentsIcon,
  [iconNames.techs.swagger]: SwaggerIcon,
  [iconNames.techs.tailwindCSS]: TailwindCSSIcon,
  [iconNames.techs.typeScript]: TypescriptIcon,
  [iconNames.techs.vite]: ViteIcon,
  [iconNames.techs.visualStudioCode]: VisualStudioCodeIcon,
  [iconNames.techs.zod]: ZodIcon,
} satisfies Record<string, SvgIconComponent>;
