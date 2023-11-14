export function Terminal({screen, footer}: { screen: JSX.Element, footer: JSX.Element }) {
    return (
        <main id="game">
            <fieldset id="terminal">
                <legend>Terminal</legend>
                <article id="screen">{screen}</article>
                <footer>$&nbsp;{footer}</footer>
            </fieldset>
        </main>
    );
}

export default Terminal;
