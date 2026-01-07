import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

interface Props {
    data: any[];
}

export default function ChildChart({ data }: Props) {
    if (!data || data.length === 0) return null;
    return (
        <LineChart
            style={{
                width: '100%',
                aspectRatio: 1.5,
                margin: 'auto',
            }}
            responsive
            data={data}
        >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis
                dataKey="age"
                label={{
                    value: 'Umur',
                    position: 'top',
                    angle: 0,
                }}
            />
            <YAxis
                dataKey="weight"
                label={{
                    value: 'Berat Bedan',
                    position: 'insideLeft',
                    angle: -90,
                }}
            />
            <Line type="monotone" dataKey="actual" stroke="#333333" />
            <Line type="monotone" dataKey="min3SD" stroke="#d9480f" />
            <Line type="monotone" dataKey="min2SD" stroke="#f08c00" />
            <Line type="monotone" dataKey="median" stroke="#82ca9d" />
            <Line type="monotone" dataKey="plus2SD" stroke="#c2255c" />
            <Line type="monotone" dataKey="plus3SD" stroke="#e03131" />
        </LineChart>
    );
}
