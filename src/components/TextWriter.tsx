import {useEffect, useState} from "react";

export function TextWriter({text}: {text: string} = {text: ''}) {
    let i = 0;
    const speed = 100;
    const [textToRender, setTextToRender] = useState(text);
    function typeWriter() {
        if (i < text.length + 1) {
            setTextToRender(text.slice(0, i));
            i++;
            setTimeout(typeWriter, speed);
        } else {
            console.log('end', i);
            i = 0;
        }
    }
    useEffect(() => {
        typeWriter();
    }, []);

    return (
        <p>{textToRender}</p>
    );
}

export default TextWriter;
