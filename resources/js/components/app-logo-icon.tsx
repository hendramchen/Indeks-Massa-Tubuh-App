import { HeartHandshake } from 'lucide-react';
import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <HeartHandshake
            size={256}
            color="#03bab7"
            strokeWidth={1.5}
            {...props}
        />
    );
}
