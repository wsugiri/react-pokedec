import React, { useEffect, useState } from 'react';
import pokemonApi from './services/pokemon';

const App = () => {
    const [initData, setInitData] = useState({});
    const [debugModel] = useState(false);

    const loadInitData = async () => {
        try {
            console.log('-->', 'init data');
            const data = await pokemonApi.getDetail(1);
            setInitData(data);
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        loadInitData();
    }, []);

    const RenderHeader = () => {
        return (
            <div style={{ padding: 10, height: 200, backgroundColor: '#9b59b6', color: '#fff' }}>
                <h1 style={{ padding: 0, margin: 0, fontSize: 24 }}>
                    {initData.name}
                </h1>
                <div style={{ float: 'right', marginTop: -20 }}>
                    #{initData.order}
                </div>
            </div>
        )
    }

    const RenderContent = () => {
        if (initData && initData.abilities && Array.isArray(initData.abilities)) {
            return (
                <div style={{ textAlign: 'center' }}>
                    {initData.abilities.map(({ ability }, key) => (
                        <div key={key}
                            style={{
                                display: 'inline-block',
                                width: '45%',
                                padding: 10
                            }}
                        >
                            <div style={{
                                textAlign: 'center',
                                backgroundColor: 'blueviolet',
                                color: 'white',
                                padding: '5px 20px',
                                borderRadius: 15,
                            }}>
                                {ability.name}
                            </div>
                        </div>
                    ))}
                </div>
            )
        }

        return '';
    }

    const RenderEvolution = () => {
        return (
            <div>
                <div
                    style={{
                        textAlign: 'center',
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginTop: 40
                    }}
                >Evolution</div>
            </div>
        )
    }

    const RenderStat = () => {
        if (initData.stats && Array.isArray(initData.stats)) {
            return (
                <div>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: 24,
                            fontWeight: 'bold',
                            marginTop: 40
                        }}
                    >Base State</div>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            {initData.stats.map(({ stat, base_stat }, idx) => (
                                <tr>
                                    <td>
                                        <div style={{ paddingLeft: 20 }}>
                                            {stat.name}
                                        </div>
                                    </td>
                                    <td>
                                        {base_stat}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }

        return '';
    }

    const RenderDebug = () => {
        if (!debugModel) return '';

        return (
            <pre>
                {JSON.stringify(initData, null, ' ')}
            </pre>
        )
    }

    return (
        <div>
            {RenderHeader()}
            {RenderContent()}
            {RenderEvolution()}
            {RenderStat()}
            {RenderDebug()}
        </div>
    );
}

export default App;