import axios from "axios";
import moment from "moment";

const formatSparkLine = (numbers) => {
    const sevenDaysAgo = moment().subtract(7, "days").unix()
    let formattedSparkline = numbers.map((item, ind) => {
        return {
            x: sevenDaysAgo + (ind + 1) *3600,
            y: item
        }
    })

    return formattedSparkline
}

const formatMarketData = (data ) => {
    let formattedData = []

    data.forEach(item => {
        const formattedSparkline = formatSparkLine(item.sparkline_in_7d.price)
        const formattedItem = {
            ...item,
            sparkline_in_7d: {
                price: formattedSparkline
            }
        }

        formattedData.push(formattedItem)
    })

    return formattedData
}

export const getMarketData = async() => {
    //api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d

    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=7d")
        const data = response.data
        const formattedResponse = formatMarketData(data)
        return formattedResponse
    } catch (err) {
      return err;
    }
}

export const getStatusUpdates = async() => {
    try{
        const response = await axios.get("https://api.coingecko.com/api/v3/status_updates?project_type=coin&per_page=20")
        const data = response.data.status_updates
        // console.log(data)
        return data

    }catch(err){
        return err
    }
}