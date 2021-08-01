import React, {useRef} from 'react';
import './App.scss'

import program from '../program.json';

import EducationProgram from "./components/EducationProgram/EducationProgram";

function App() {
    const screenRef = useRef(window.innerWidth <= 480 ? 'mobile' : 'pc');

    return (
        <div className='app'>
            <header>
                <h2>Find Your Course</h2>
            </header>

            <main>
                <EducationProgram program={program} screen={screenRef.current}/>
            </main>
        </div>
    );
}

export default App;