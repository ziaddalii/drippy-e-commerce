export interface IConditionallyRenderProps {
  condition: boolean;
  show: JSX.Element | RenderFunc;
  elseShow?: JSX.Element | RenderFunc;
}

export type RenderFunc = () => JSX.Element;
