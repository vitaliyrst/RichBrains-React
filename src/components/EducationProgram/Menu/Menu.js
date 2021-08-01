import React, {useState} from 'react';
import './Menu.scss';

const Menu = ({
                  courses,
                  screen,
                  selectedCategory,
                  selectedSpecialization,
                  onSelectCategory,
                  onSelectSpecialization
              }) => {

    const [stateHeader, setStateHeader] = useState(false);

    const handleClickHeader = () => {
        setStateHeader(!stateHeader);
    }

    const getCategoryList = () => {
        return (
            <ul className='menu_category_list'>
                {courses.map((course, index) => {
                    const selected = selectedCategory === course.category;

                    return (
                        <React.Fragment key={index}>
                            <li className={selected ? 'menu_category_list_item_open' : 'menu_category_list_item_close'}
                                onClick={(eo) => onSelectCategory(eo, course)}
                            >
                                <div>
                                    {course.category}
                                </div>
                                <img src={selected ?
                                    './assets/images/menu/arrow_open.svg' :
                                    './assets/images/menu/arrow_close.svg'}
                                     alt='arrow_close'
                                />
                            </li>

                            {selected && getSpecializationsList(course.specializations)}
                        </React.Fragment>
                    );
                })}
            </ul>
        );
    }

    const getSpecializationsList = (specializations) => {
        return (
            <ul className='menu_specializations_list'>
                {specializations.map((specialization, index) => {
                    const selected = selectedSpecialization === specialization.title;

                    return (
                        <li key={index}
                            className={selected ?
                                'menu_specializations_list_item_active' :
                                'menu_specializations_list_item'}
                            onClick={(eo) => onSelectSpecialization(eo, specialization)}
                        >
                            <div>
                                {specialization.title}
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }

    const getMenu = () => {
        if (screen === 'mobile') {
            return (
                <>
                    <div className='menu_mobile_header' onClick={handleClickHeader}>
                        <div className='menu_mobile_header_wrapper'>
                            <img src={'./assets/images/menu/careers.svg'} alt='careers'/>
                            <div className={stateHeader ?
                                'menu_mobile_header_title_open' :
                                'menu_mobile_header_title_close'}>
                                CHOOSE YOUR CAREER
                            </div>
                        </div>
                        {stateHeader ?
                            <img width='14' height='6' src={'./assets/images/menu/arrow_open.svg'} alt='open'/> :
                            <img width='7' height='14' src={'./assets/images/menu/arrow_close.svg'} alt='close'/>}
                    </div>
                    {stateHeader && getCategoryList()}
                </>
            );
        } else {
            return (
                <>
                    <div className='menu_header_wrapper'>
                        <img src={'./assets/images/menu/careers.svg'} alt='careers'/>
                        <div className='menu_header'>CAREERS</div>
                    </div>

                    {getCategoryList()}

                    <div className='menu_button_container'>
                        <button className='menu_button' type='button'>SHOW ALL PROGRAMMES</button>
                    </div>
                </>
            );
        }
    }

    return (
        <div className='menu_container'>
            {getMenu()}
        </div>
    );
};

export default Menu;