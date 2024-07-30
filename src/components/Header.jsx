import React from 'react';
import '../style/Header.css';
import headerlogo from '../images/Component 42.svg'

const Header = () => {

    return (
        <header className="header">
            <div className='container'>
                <div className="header_row">
                    <div className="header-left">
                        <img src={headerlogo} alt=''/>
                    </div>
                    {/* <div className='header_right'>
                        <div className="header-center_">
                            <SearchBar onSearch={handleSearch} />
                        </div>
                        <div className="header-right">
                            <button className="signin-button">Sign In</button>
                        </div>
                    </div> */}

                </div>
            </div>
        </header>
    );
};

export default Header;