import axios from '../helper/axioshttp'


//返回所有数据
async function index(params) {

    let url = '/api/v1/article/index'
    let item = {
        pagenum: params.currentPage,
        pagerow: params.limit,
        keyword: params.name

    };

    let result = await axios.post(url, item)

    if (result.status === true) {
        return result.data
    }
}

// 
async function read(id) {

    let url = "/api/v1/article/read";

    let result = await axios.post(url, { questionid: id });

    if (result.status === true) {
        return result.data;
    }
}

async function createAndUpdate(item, action) {

    let url
    let question
    if (action === "add") {
        url = '/api/v1/article/create'
        question = item
    } else {
        url = '/api/v1/article/update'
        question = {
            "questionid": item._id,
            "topic": item.topic,
            "answer": item.answer,
            "category": item.category
        };
    }


    let result = await axios.post(url, question);

    if (result.status === true) {
        return result.data;
    }
}


async function del(id) {

    let url = '/api/v1/article/delete'

    let result = await axios.post(url, id)

    if (result.status === true) {
        return "success"
    }
}

export const articleService = {
    read,
    createAndUpdate,
    index,
    del
};
