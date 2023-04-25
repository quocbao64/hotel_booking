/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Newsletter from '../../components/Newsletter/Newsletter';
import SearchItem from '../../components/SearchItem/SearchItem';
import { Context } from '../../ContextApi/Context';
import style from '../../styles/hotels.module.scss';

const index = ({ hotelList }) => {
    const { query } = useRouter();
    const [openDate, setOpenDate] = useState(false);
    const [city, setCity] = useState(query.city || '');
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        rooms: 1,
    });
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [star, setStar] = useState(0)
    const [hotelData, setHotelData] = useState(hotelList);

    const { dispatch } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // fetch data from server by search values
        const url = `http://localhost:3000/filter?from=${dates[0].startDate?.toISOString()}&to=${dates[0].endDate?.toISOString()}`
        city !== '' && (url += `&address=${city}`)
        min !== 0 && (url += `&min=${min}`)
        max !== 0 && (url += `&max=${max}`)
        star !== 0 && (url += `&star=${star}`)

        const hotels = await axios.get(url);
        const hotelDatas = await hotels.data.data;
        console.log(hotelDatas);
        setHotelData(hotelDatas);
    };

    useEffect(() => {
        console.log(hotelData);
    }, [hotelData])
    

    return (
        <div className={style.hotels_page}>
            <Navbar />
            <Header type="hList" />

            <div className={style.hotels_page_main}>
                <div className={style.hotels_page_search}>
                    <h2>Tìm kiếm</h2>
                    <div className={style.search_item}>
                        <label>Thành phố</label>
                        <input
                            type="text"
                            placeholder={city}
                            value={city?.toLowerCase()}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div className={style.search_item}>
                        <label>Ngày nhận phòng</label>
                        <span
                            className={style.search_item_date}
                            onClick={() => setOpenDate(!openDate)}
                        >{`${format(dates[0]?.startDate, 'MM/dd/yyyy')} đến ${format(
                            dates[0].endDate,
                            'MM/dd/yyyy'
                        )}`}</span>
                        {openDate && (
                            <DateRange
                                editableDateInputs
                                onChange={(item) => setDates([item.selection])}
                                ranges={dates}
                                className={style.header_search_calender}
                                minDate={new Date()}
                            />
                        )}
                    </div>

                    <div className={style.search_item}>
                        <label style={{ marginBottom: '11px', marginTop: '10px' }}>Lựa chọn</label>
                        <div className={style.search_item_option}>
                            <span className={style.option_txt}>
                                Giá thấp nhất <small className={style.night_batch}>mỗi đêm</small>
                            </span>
                            <input
                                type="number"
                                className={style.option_inp}
                                min={1}
                                onChange={(e) => setMin(e.target.value)}
                            />
                        </div>

                        <div className={style.search_item_option}>
                            <span className={style.option_txt}>
                                Giá cao nhất <small className={style.night_batch}>mỗi đêm</small>
                            </span>
                            <input
                                type="number"
                                className={style.option_inp}
                                max={5000}
                                min={1}
                                onChange={(e) => setMax(e.target.value)}
                            />
                        </div>

                        <div className={style.search_item_option}>
                            <span className={style.option_txt}>Đánh giá</span>
                            <input
                                type="number"
                                min={1}
                                max={5}
                                value={star}
                                onChange={(e) => setStar(e.target.value)}
                                className={style.option_inp}
                                placeholder={star}
                            />
                        </div>
                    </div>
                    <button
                        className={style.header_search_btn}
                        type="button"
                        onClick={handleSubmit}
                    >
                        Tìm kiếm
                    </button>
                </div>

                <div className={style.hotels_page_result}>
                    {hotelData?.map((results_item) => (
                        <SearchItem results={results_item} key={results_item?.hotel_id} />
                    ))}
                </div>
            </div>

            <Newsletter />
            <Footer />
        </div>
    );
};

export default index;

// fetch the data using getStaticProps
export async function getStaticProps() {
    const response = await axios.get('http://localhost:3001/api/hotels')
    const data = await response.data.data.rows

    return {
        props: { hotelList: data }
    }
}
