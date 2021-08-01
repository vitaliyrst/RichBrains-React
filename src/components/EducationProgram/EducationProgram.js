import React, {useState} from 'react';
import './EducationProgram.scss';

import Menu from "./Menu/Menu";
import Courses from "./Courses/Courses";

const EducationProgram = ({program, screen}) => {

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [specializations, setSpecializations] = useState([]);
    const [courses, setCourses] = useState([]);

    const handleClickCategory = (eo, category) => {
        eo.stopPropagation();

        if (category.category === selectedCategory) {
            setSelectedCategory('');
            setSelectedSpecialization('');
            setSpecializations([]);
            setCourses([]);
        } else {
            setSelectedCategory(category.category);
            setSpecializations(category.specializations);
            setSelectedSpecialization('');
            setCourses([]);
        }
    }

    const handleClickSpecialization = (eo, specialization) => {
        eo.stopPropagation();
        setSelectedSpecialization(specialization.title);
        setCourses(specialization.courses);
    }

    const getCourses = () => {
        if (!selectedCategory) {
            return <div className='education_program_prompt'>Please select a category</div>
        }

        if (selectedCategory && specializations.length === 0) {
            return <div className='education_program_prompt'>
                There are no specializations in the selected category, try another
            </div>
        }

        if (selectedCategory && !selectedSpecialization && specializations.length > 0) {
            return <div className='education_program_prompt'>Please select a specialization</div>
        }

        if (selectedCategory && selectedSpecialization && courses.length === 0) {
            return <div className='education_program_prompt'>
                There are no programs in this specialization, try another
            </div>
        }

        if (courses.length > 0) {
            return <Courses category={selectedCategory} courses={courses} screen={screen}/>;
        }
    }

    return (
        <div className='education_program_container'>
            <Menu courses={program}
                  screen={screen}
                  selectedCategory={selectedCategory}
                  selectedSpecialization={selectedSpecialization}
                  onSelectSpecialization={handleClickSpecialization}
                  onSelectCategory={handleClickCategory}
            />

            {getCourses()}
        </div>
    );
};

export default EducationProgram;