import axios from 'axios'

export function request1(config,success,failure){
    //success和failure是请求成功和请求失败时的两个函数
    //通过上述两个函数将请求成功和请求失败的结果传递出去
    //1.创建axios实例
    const instance = axios.create({
        baseURL:'http://127.0.0.1:8000',
        timeout:5000
    })
    
    instance(config)
    .then(res=>{
        success(res);
    })
    .catch(err =>{
        failure(err);
    })
}

export function request2(config){
    //success和failure是请求成功和请求失败时的两个函数
    //通过上述两个函数将请求成功和请求失败的结果传递出去
    //1.创建axios实例
    const instance = axios.create({
        baseURL:'http://127.0.0.1:8000',
        timeout:5000
    })
    
    instance(config.baseConfig)
    .then(res=>{
        config.success(res);
    })
    .catch(err =>{
        config.failure(err);
    })
}

export function request3(config){
    return new Promise((resolve,reject) => {
        //1.创建axios实例
        const instance = axios.create({
            baseURL:'http://127.0.0.1:8000',
            timeout:5000
        })

        instance(config)
        .then(res=>{
            resolve(res);
        })
        .catch(err =>{
            reject(err);
        })
    })
}

export function request4(config){
    //1.创建axios实例
    const instance = axios.create({
        baseURL:'http://127.0.0.1:9001',
        timeout:5000
    })

    return instance(config)
}