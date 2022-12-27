import * as React from 'react';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple((window as any).ripple);
export class SampleBase extends React.PureComponent {
    public rendereComplete(): void {
        /**custom render complete function */
    }
    componentDidMount(): void {
        setTimeout(() => {
                this.rendereComplete();
            }
        );
    }
}
export function updateSampleSection(): void {}