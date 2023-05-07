import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { FaGripLines, FaHome, FaTimes } from 'react-icons/fa';
import { MdLocalHotel, MdMapsHomeWork, MdOutlineContactSupport, MdSupervisedUserCircle } from 'react-icons/md';
import Swal from 'sweetalert2';
import Input from '../../components/Input/Input';
import { Contexts } from '../../ContextUser/Contexts';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from '../../styles/login.module.scss';
import style from './Navbar.module.scss';

function Navbar() {
    const { user, dispatch, loading } = useContext(Contexts);
    const [toggler, setToggler] = useState(false);

    const menus = [
        {
            id: 1,
            icon: <FaHome className={style.icon} />,
            txt: 'Trang chủ',
            isActive: false,
            href: '/',
        },
        {
            id: 2,
            icon: <MdMapsHomeWork className={style.icon} />,
            txt: 'Danh sách phòng',
            isActive: false,
            href: '/rooms',
        }, 
        {
            id: 3,
            icon: <MdSupervisedUserCircle className={style.icon} />,
            txt: 'Về chúng tôi',
            isActive: false,
            href: '/about',
        },
        {
            id: 4,
            icon: <MdOutlineContactSupport className={style.icon} />,
            txt: 'Liên hệ',
            isActive: false,
            href: '/contact',
        }
    ];

    user && (
        menus.push({
            id: 3,
            icon: <MdMapsHomeWork className={style.icon} />,
            txt: 'Phòng đã đặt',
            isActive: false,
            href: '/order',
        })
    )

    const [inpval, setInpval] = useState({
        email: '',
        password: '',
    });

    const [regisInpval, setRegisInpval] = useState({
        email: '',
        password: '',
        username: '',
        confirm_password: '',
        phone_number: ''
    });
    const [err, setErr] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };
    // const { data: session } = useSession()

    const inpLoginDetail = [
        {
            id: 2,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            required: true,
            errMsg: 'Vui lòng nhập đúng định dạng email!',
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            placeholder: 'Mật khẩu',
            required: true,
            errMsg: 'Không được bỏ trống!',
        },
    ];

    const inpRegisterDetail = [
        {
            id: 2,
            name: 'username',
            type: 'text',
            placeholder: 'Tên người dùng',
            required: true,
            errMsg: 'Không được bỏ trống!',
        },
        {
            id: 3,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            required: true,
            errMsg: 'Vui lòng nhập đúng định dạng email!',
        },
        {
            id: 4,
            name: 'phone_number',
            type: 'text',
            placeholder: 'Số điện thoại',
            required: true,
            errMsg: 'Không được bỏ trống!',
        },
        {
            id: 5,
            name: 'password',
            type: 'password',
            placeholder: 'Mật khẩu',
            required: true,
            errMsg: 'Không được bỏ trống!',
        },
        {
            id: 6,
            name: 'confirm_password',
            type: 'password',
            placeholder: 'Nhập lại mật khẩu',
            required: true,
            errMsg: 'Không được bỏ trống!',
        }
    ];

    const handleChng = (e) => {
        setInpval({ ...inpval, [e.target.name]: e.target.value });
    };

    const handleRegisChng = e => {
        setRegisInpval({...regisInpval, [e.target.name]: e.target.value})
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        width: '250px',
        padding: '.75rem',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });

        try {
            const res = await axios.post(
                'http://localhost:3000/login',
                {
                    user_email: inpval['email'],
                    user_password: inpval['password']
                }
            );
            if (res.data.data.code === 1) {
                return Toast.fire({
                    icon: 'error',
                    title: res.data.data.msg,
                });
            }
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.data });

            Toast.fire({
                icon: 'success',
                title: 'Đăng nhập thành công',
            });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE' });
            setErr(true);
        }
    };

    const handleRegisSubmit = async e => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:3000/register',
                {
                    user_email: regisInpval['email'],
                    user_password: regisInpval['password'],
                    user_name: regisInpval['username'],
                    confirm_password: regisInpval['confirm_password'],
                    user_phone: regisInpval['phone_number'],
                }
            );

            Toast.fire({
                icon: 'success',
                title: 'Đăng ký thành công.',
            });
            closeRegisterModal()
            openLoginModal()
        } catch (error) {
            setErr(true);
        }
    }

    const handleToggle = () => {
        setToggler(!toggler);
    };

    const handleLogOut = () => {
        dispatch({ type: 'LOG_OUT' });
    };

    return (
        <div className={style.navbar}>
            <div className={style.navbar_main}>
                <Link href="/">
                    <div className={style.nav_brand}>
                        <h2>
                            <MdLocalHotel size={30} style={{ marginRight: '5px' }} /> Rooms
                        </h2>
                    </div>
                </Link>

                <div className={style.header_menus}>
                    <ul>
                        {menus.map((menu) => (
                            <Link href={menu.href} key={menu.id}>
                                <li>
                                    {menu.icon} {menu.txt}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                

                <div className={style.registration}>
                    {user ? (
                        <button className={style.reg_btn} type="button" onClick={handleLogOut}>
                            Đăng xuất
                        </button>
                    ) : (
                        <>
                            <button className={style.reg_btn} onClick={openLoginModal}>Đăng nhập</button>
                            <Modal show={isLoginModalOpen} onHide={closeLoginModal} fade={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Đăng nhập</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className={styles.login_page_main}>
                                        <div className={styles.signup_page_form}>
                                            <form action="" onSubmit={handleSubmit}>
                                                {inpLoginDetail.map((inpLoginDetail) => (
                                                    <div>
                                                        <label style={{marginBottom: "6px", marginTop: "15px"}}>{inpLoginDetail['placeholder']}</label>
                                                        <Input
                                                            {...inpLoginDetail}
                                                            key={inpLoginDetail.id}
                                                            value={inpval[inpLoginDetail.name]}
                                                            onChange={handleChng}
                                                        />
                                                    </div>
                                                ))}

                                                {err && (
                                                    <p style={{ color: 'red', marginBottom: '0px' }}>
                                                        Xác thực thất bại!
                                                    </p>
                                                )}
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "20px"}}>
                                                    <input
                                                        type="submit"
                                                        value="Đăng nhập"
                                                        className={styles.submit_btn}
                                                        disabled={loading}
                                                        style={{width: "30%", marginTop: 0}}
                                                    />

                                                    <p style={{cursor: "pointer", marginBottom: 0}} onClick={() => {
                                                        closeLoginModal()
                                                        openRegisterModal()
                                                    }}>
                                                            Đăng ký ngay
                                                    </p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>

                            
                            <button className={style.reg_btn} style={{marginLeft: "15px"}} onClick={openRegisterModal}>Đăng ký</button>
                            <Modal show={isRegisterModalOpen} onHide={closeRegisterModal} fade={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Đăng ký</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className={styles.login_page_main}>
                                        <div className={styles.signup_page_form}>
                                            <form action="" onSubmit={handleRegisSubmit}>
                                                <div>
                                                    <label style={{marginBottom: "6px", marginTop: "15px"}}>{inpRegisterDetail[1]['placeholder']}</label>
                                                    <Input
                                                        {...inpRegisterDetail[1]}
                                                        key={inpRegisterDetail[1].id}
                                                        value={regisInpval[inpRegisterDetail[1].name]}
                                                        onChange={handleRegisChng}
                                                    />
                                                </div>
                                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                                    <div style={{width: "49%"}}>
                                                        <label style={{marginBottom: "6px", marginTop: "15px"}}>{inpRegisterDetail[0]['placeholder']}</label>
                                                        <Input
                                                            {...inpRegisterDetail[0]}
                                                            key={inpRegisterDetail[0].id}
                                                            value={regisInpval[inpRegisterDetail[0].name]}
                                                            onChange={handleRegisChng}
                                                        />
                                                    </div>
                                                    
                                                    <div style={{width: "49%"}}>
                                                        <label style={{marginBottom: "6px", marginTop: "15px"}}>{inpRegisterDetail[2]['placeholder']}</label>
                                                        <Input
                                                            {...inpRegisterDetail[2]}
                                                            key={inpRegisterDetail[2].id}
                                                            value={regisInpval[inpRegisterDetail[2].name]}
                                                            onChange={handleRegisChng}
                                                        />
                                                    </div>
                                                </div>
                                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                                    <div style={{width: "49%"}}>
                                                        <label style={{marginBottom: "6px", marginTop: "15px"}}>{inpRegisterDetail[3]['placeholder']}</label>
                                                        <Input
                                                            {...inpRegisterDetail[3]}
                                                            key={inpRegisterDetail[3].id}
                                                            value={regisInpval[inpRegisterDetail[3].name]}
                                                            onChange={handleRegisChng}
                                                        />
                                                    </div>
                                                    
                                                    <div style={{width: "49%"}}>
                                                        <label style={{marginBottom: "6px", marginTop: "15px"}}>{inpRegisterDetail[4]['placeholder']}</label>
                                                        <Input
                                                            {...inpRegisterDetail[4]}
                                                            key={inpRegisterDetail[4].id}
                                                            value={regisInpval[inpRegisterDetail[4].name]}
                                                            onChange={handleRegisChng}
                                                        />
                                                    </div>
                                                </div>

                                                {err && (
                                                    <p style={{ color: 'red', marginBottom: '0px' }}>
                                                        Xác thực thất bại. Tài khoản hoặc mật khẩu không đúng
                                                    </p>
                                                )}
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "20px"}}>
                                                    <input
                                                        type="submit"
                                                        value="Đăng ký"
                                                        className={styles.submit_btn}
                                                        disabled={loading}
                                                        style={{width: "30%", marginTop: 0}}
                                                    />

                                                    <p style={{cursor: "pointer", marginBottom: 0}} onClick={() => {
                                                        closeRegisterModal()
                                                        openLoginModal()
                                                    }}>
                                                            Đăng nhặp tại đây
                                                    </p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </>
                        // <Modal>
                        
                        // </Modal>
                    )}
                </div>

                <div className={style.res_nav}>
                    {toggler ? (
                        <FaTimes onClick={handleToggle} className={style.tgl_btn} />
                    ) : (
                        <FaGripLines onClick={handleToggle} className={style.tgl_btn} />
                    )}
                    {toggler && (
                        <div className={style.res_nav_menu}>
                            <ul>
                                {menus.map((menu) => (
                                    <Link href={menu.href} key={menu.id}>
                                        <li>
                                            {menu.icon} {menu.txt}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
