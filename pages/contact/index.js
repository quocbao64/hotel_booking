/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Card, Nav } from 'react-bootstrap';
import { MdMessage, MdPhone } from 'react-icons/md';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Newsletter from '../../components/Newsletter/Newsletter';
import style from '../../styles/contact.module.scss';

const index = ({ hotelList }) => {

    return (
        <div>
            <Navbar />
            <Header type="hList" />
            <div className={style.contact_page}>
                <div>
                    <Nav className="flex-column">
                        <Nav.Item>
                            <Nav.Link href="/about">Về Rooms</Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={{backgroundColor: "#e7e4e4"}}>
                            <Nav.Link href="/contact">Liên hệ</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div>
                    <h2>Liên hệ</h2>
                    <h4 style={{marginBottom: "30px"}}>Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/24</h4>
                    <div className={style.contact_page_card}>
                        <Card style={{marginRight: "10px", height: "fit-content"}}>
                            <Card.Body style={{display: "flex"}}>
                                <MdPhone size={70} />
                                <div style={{marginLeft: "16px"}}>
                                    <h4>Gọi cho chúng tôi</h4>
                                    <p>Đối với bất cứ điều gì khẩn cấp, bạn có thể gọi cho chúng tôi 24/7 theo số điện thoại <strong>0345678912</strong></p>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card style={{marginLeft: "10px", height: "fit-content"}}>
                            <Card.Body style={{display: "flex"}}>
                                <MdMessage size={70} />
                                <div style={{marginLeft: "16px"}}>
                                    <h4>Gửi tin nhắn cho chúng tôi</h4>
                                    <p>Liên hệ với email: 
                                        <strong style={{margin: "0 5px"}}>
                                            <a href='mailto:room@gmail.com'>room@gmail.com</a>
                                        </strong> 
                                        về vấn đề đặt phòng của bạn và chúng tôi sẽ trả lời ngay khi có thể.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </div>
    );
};

export default index;
