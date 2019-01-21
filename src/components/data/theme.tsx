import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  theme: string
}

export default createProviderConsumer<State>({
    theme: 'default'
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
