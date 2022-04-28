import React, { useState } from "react";
import './readMore.css'

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 500) : text}
            <span onClick={toggleReadMore} className="read-or-hide">
                {(() => {
                    if (text.length > 500) {
                        return (
                            <>
                                {isReadMore ? "...Mai mult" : " Mai putin"}
                            </>
                        )
                    }
                })()}
            </span>
        </p>
    );
};
export default ReadMore;