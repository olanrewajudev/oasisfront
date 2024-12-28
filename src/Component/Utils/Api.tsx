import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const offlineServer = 'http://localhost:4000';
export const offline = 'http://localhost:4000/api';

// export const offlineServer = 'https://server.finesseoasis.com.ng/api';
// export const offline = 'https://server.finesseoasis.com.ng/api';

const token = Cookies.get('oasis');

const service = "service";
const user = "user"
const price = "price"
const professional = "professional"
const booking = "booking"

const Service_urls = {
    all_service: `${service}`,
    new_service: `${service}/new`,
    update_service: `${service}/update`,
    single_service: `${service}/single-service`,
    delete_service: `${service}/delete-service`,
    feed_admin: `${service}/all/feed-admin`,
    fetch_associates: `${service}/fetch-associates`,
    service_cartegory: `${service}/service-cart`,
    duplicate_service: `${service}/duplicate-service`,

    generate_booking: `${service}/generate-booking`,
    generate_multiple_booking: `${service}/generate-multiple-booking`,
    booking: `${service}/booking`,
    all_bookings: `${service}/all-bookings`,
    update_booking: `${service}/update-booking`,
    all_tracks: `${service}/tracks/all`,

    add_review: `${service}/reviews/add-review`,
    update_review: `${service}/reviews/update-review`,
    delete_review: `${service}/reviews/delete-review`,
    service_review: `${service}/reviews/review-service`,

    my_carts: `${service}/cart/get-my-carts`,
    add_to_cart: `${service}/cart/add-new-cart`,
    delete_cart_item: `${service}/cart/delete-cart-item`,

}

const price_urls = {
    new_price: `${price}/new-price`,
    update_price: `${price}/update-price`,
    single_price: `${price}/single-price`,
    all_price: `${price}/price`,
    delete_price: `${price}/delete-price`,

    add_section: `${price}/add-section`,
    all_section: `${price}/all-sections`,
    update_section: `${price}/update-section`,
    delete_section: `${price}/delete-section`,
    single_section: `${price}/single-updating`,
    home_sections: `${price}/get-home-price`,
    duplicate_price: `${price}/duplicate`,

}
const category_urls = {
    add_category: `${service}/category/add`,
    update_category: `${service}/category/update`,
    all_category: `${service}/category-all`,
    single_category: `${service}/category`,
    delete_category: `${service}/delete-category`,
};
const booking_urls = {
    generate_booking: `${booking}/generate-booking`,
    generate_multiple_booking: `${booking}/generate-multiple-booking`,
    booking: `${booking}/booking`,
    all_bookings: `${booking}/all-bookings`,
    update_booking: `${booking}/update-booking`,
    all_tracks: `${booking}/tracks/all`,

};
const professional_urls = {
    all_professional: `${professional}/all-professional`,
    new_professional: `${professional}/add-professional`,
    update_professional: `${professional}/update-professional`,
    single_professional: `${professional}/single-professional`,
    delete_professional: `${professional}/delete-professional`,
};

const user_urls = {
    register_account: `${user}/create`,
    login_account: `${user}/login`,
    get_account: `${user}/get-account`,
    logout_account: `${user}/logout-access`,
    super: `${user}/super`,
    images: `${user}/images`,
}
export const Apis = {
    services: Service_urls,
    category: category_urls,
    users: user_urls,
    prices: price_urls,
    professionals: professional_urls,
    booking: booking_urls,
};

const options = {
    headers: {
        authorization: `Bearer ${token}`
    }
};

export const Posturl = async (endpoint: string, data?: any) => {
    const res = await axios.post(`${offline}/${endpoint}`, data);
    return res.data;
};

export const Deleteurl = async (endpoint: string, data?: AxiosRequestConfig) => {
    const res = await axios.delete(`${offline}/${endpoint}`, { data });
    return res.data;
};

export const Geturl = async (endpoint: string) => {
    const res = await axios.get(`${offline}/${endpoint}`);
    return res.data;
};

// Authorized configuration

export const AuthPosturl = async (endpoint: string, data?: any) => {
    const res = await axios.post(`${offline}/${endpoint}`, data, options);
    return res.data;
};

export const AuthDeleteurl = async (endpoint: string, data?: AxiosRequestConfig) => {
    const res = await axios.delete(`${offline}/${endpoint}`, { ...options, data });
    return res.data;
};

export const AuthGeturl = async (endpoint: string) => {
    const res = await axios.get(`${offline}/${endpoint}`, options);
    return res.data;
};
