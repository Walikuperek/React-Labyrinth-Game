export function Menu({onPlayClicked}: {onPlayClicked: () => void}) {
    return (<main className="menu"><main className="menu">
        <h1>Labyrinth Game</h1>
        <div className="card">
            <button onClick={() => onPlayClicked()}>
                Play
            </button>
            <p>
                Click <code>Play</code> to start the game.
            </p>
        </div>
        <p className="read-the-docs">
            This is <a href="https://quak.com.pl">QUAK</a> game.
        </p>
    </main></main>);
}

export default Menu;
