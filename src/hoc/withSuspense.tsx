import React, {Suspense} from 'react';

type Props = {
    comp: JSX.Element;
}

export const   WithSuspense: React.FunctionComponent<Props> = ({ comp:Component}) => {
    return <Suspense fallback={<div>...Loading</div>}>
        {Component}
    </Suspense>
};



