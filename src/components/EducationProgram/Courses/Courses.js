import React, {useState} from 'react';
import './Courses.scss';

const Courses = ({category, courses, screen}) => {
    const [enter, setEnter] = useState([]);
    const [addedCards, setAddedCards] = useState([]);

    const handleEnterCard = (index) => {
        setEnter([...enter, index]);
    }

    const handleLeaveCard = (index) => {
        const isAdded = addedCards.some(item => item === index);
        const temp = [];

        enter.forEach(item => {
            if (item !== index) {
                temp.push(item);
            }
        });

        if (!isAdded) {
            setEnter(temp);
        }
    }

    const handleClickAdd = (index) => {
        const temp = [...addedCards];
        temp.push(index);
        setAddedCards(temp);
    }

    const handleClickClose = (index) => {
        const temp = [];

        addedCards.forEach(item => {
            if (item !== index) {
                temp.push(item);
            }
        })

        setAddedCards(temp);
    }

    const getCoursesList = () => {
        if (screen === 'mobile') {
            return (
                <ul className='courses_list'>
                    {courses.map((course, index) => {
                        return getMobileItem(course, index);
                    })}
                </ul>
            );
        } else {
            return (
                <ul className='courses_list'>
                    {courses.map((course, index) => {
                        if (enter.includes(index)) {
                            return getHoveredItem(course, index);
                        } else {
                            return getStaticItem(course, index);
                        }
                    })}
                </ul>
            );
        }
    }

    const getStaticItem = (course, index) => {
        return (
            <li key={index}
                className='courses_list_item'
                onPointerEnter={() => handleEnterCard(index)}
            >
                <div className='courses_list_item_top_wrapper'>
                    <div className='courses_list_item_logo_wrapper'>
                        <img src={course.image} alt='company logo'/>
                    </div>
                    <div className='courses_list_item_category'>{category}</div>
                    <div className='courses_list_item_title'>{course.title}</div>
                </div>

                <div className='courses_list_item_bottom_wrapper'>
                    <div className='courses_list_item_education_wrapper'>
                        <img src={'./assets/images/courses/education.svg'} alt='education image'/>
                        <div>{course.education}</div>
                    </div>
                    <div className='courses_list_item_date_wrapper'>
                        <img src={'./assets/images/courses/date.svg'} alt='date image'/>
                        <div>{course.date}</div>
                    </div>
                    <button className='courses_list_item_button' type='button'>MORE INFO</button>
                </div>
            </li>
        );
    }

    const getHoveredItem = (course, index) => {
        const isAdded = addedCards.some(item => item === index);

        return (
            <li key={index}
                className='courses_list_item_hovered'
                onPointerLeave={() => handleLeaveCard(index)}
            >
                <div className='courses_list_item_top_wrapper'>
                    <div className='courses_list_item_control_wrapper'>
                        {isAdded ?
                            <img src={'./assets/images/courses/close.svg'} alt='close'
                                 onClick={() => handleClickClose(index)}
                            /> :
                            <img src={'./assets/images/courses/add.svg'} alt='add'
                                 onClick={() => handleClickAdd(index)}
                            />}
                    </div>
                    <div className='courses_list_item_mba'>{course.mba}</div>

                    <div className='courses_list_item_duration_wrapper'>
                        <div>Duration:</div>
                        <p>Minimum: {course.duration[0]} months</p>
                        <p>Maximum: {course.duration[1]} months</p>
                    </div>
                    <div className='courses_list_item_dates_wrapper'>
                        <div>Start Dates:</div>
                        <p>{course.start}</p>
                    </div>
                </div>

                <div className='courses_list_item_bottom_wrapper'>
                    <div className='courses_list_item_price'>{course.price}</div>
                    <button type='button' className={isAdded ?
                        'courses_list_item_button_hovered_added' :
                        'courses_list_item_button_hovered'}>
                        MORE INFO
                    </button>
                </div>
            </li>
        );
    }

    const getMobileItem = (course, index) => {
        const isAdded = addedCards.some(item => item === index);

        return (
            <li key={index}
                className='courses_list_item_mobile'>
                <div className='courses_list_item_top_wrapper'>
                    <div className='courses_list_item_logo_wrapper'>
                        {isAdded ?
                            <img width='30' height='30' src={'./assets/images/courses/mobile_close.svg'} alt='add'
                                 onClick={() => handleClickClose(index)}/>:
                            <img width='30' height='30' src={'./assets/images/courses/mobile_add.svg'} alt='add'
                                 onClick={() => handleClickAdd(index)}/>
                        }

                        <img src={course.image} alt='company logo'/>
                    </div>
                    <div className='courses_list_item_category'>{category}</div>
                    <div className='courses_list_item_title'>{course.title}</div>
                    <div className='courses_list_item_education'>{course.education}</div>
                </div>

                <div className='courses_list_item_bottom_wrapper'>
                    <div className='courses_list_item_date_wrapper'>
                        <div>{course.price}</div>
                    </div>
                    <button className='courses_list_item_button' type='button'>MORE INFO</button>
                </div>
            </li>
        );
    }

    return (
        <div className='courses_container'>
            {getCoursesList()}
            <div className='courses_more_wrapper'>
                <div>MORE PROGRAMMES</div>
                <img src={'./assets/images/courses/more.svg'} alt='more programmes'/>
            </div>
        </div>
    );
};

export default Courses;