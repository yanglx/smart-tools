/**
 * 批量转换百度坐标系(BD-09)到世界地理坐标系(WGS-84)
 * @param {Array} coordinates - 一个包含百度坐标系经纬度对的数组
 * @returns {Array} - 转换后的世界地理坐标系经纬度对象数组
 */
function bd09towgs84BatchConvert(coordinates) {
    const wgs84Coordinates = coordinates.map(([bdLng, bdLat]) => {
        const gcj02 = coordtransform.bd09togcj02(bdLng, bdLat);
        const wgs84 = coordtransform.gcj02towgs84(gcj02[0], gcj02[1]);
        // console.log(wgs84[0]+','+wgs84[1]);
        return { lng: wgs84[0], lat: wgs84[1] };
    });
    return wgs84Coordinates;
}

/**
 * 批量转换WGS-84坐标系到GCJ-02坐标系
 *
 * 此函数接收一组WGS-84坐标，并将其转换为GCJ-02坐标系下的坐标
 * 转换使用了第三方库coordtransform提供的方法wgs84togcj02
 *
 * @param {Array} coordinates - 一个包含多个WGS-84坐标的数组，每个坐标为[lng, lat]格式
 * @returns {Array} - 返回一个数组，包含转换后的GCJ-02坐标，每个坐标为对象形式
 */
function wgs84togcj02BatchConvert(coordinates) {
    const gcj021 = coordinates.map(([bdLng, bdLat]) => {
        const wgs84 = coordtransform.wgs84togcj02(bdLng, bdLat);
        // console.log(wgs84[0]+','+wgs84[1]);
        return { lng: wgs84[0], lat: wgs84[1] };
    });
    return gcj021;
}

/**
 * 批量转换WGS-84坐标系到百度坐标系(BD-09)
 * @param {Array} coordinates - 一个包含WGS-84经纬度对的数组
 * @returns {Array} - 转换后的百度坐标系经纬度对象数组
 */
function wgs84tobd09BatchConvert(coordinates) {
        const bd09Coordinates = coordinates.map(([wgs84Lng, wgs84Lat]) => {
        const gcj02 = coordtransform.wgs84togcj02(wgs84Lng, wgs84Lat);
        debugger
        const bd09 = coordtransform.gcj02tobd09(gcj02[0], gcj02[1]);
        return { lng: bd09[0], lat: bd09[1] };
    });
    return bd09Coordinates;
}

/**
 * 批量转换GCJ-02坐标系到WGS-84坐标系
 * @param {Array} coordinates - 一个包含GCJ-02经纬度对的数组
 * @returns {Array} - 转换后的WGS-84坐标系经纬度对象数组
 */
function gcj02towgs84BatchConvert(coordinates) {
        const wgs84Coordinates = coordinates.map(([gcj02Lng, gcj02Lat]) => {
        const wgs84 = coordtransform.gcj02towgs84(gcj02Lng, gcj02Lat);
        return { lng: wgs84[0], lat: wgs84[1] };
    });
    return wgs84Coordinates;
}

/**
 * 格式化坐标数组为指定的字符串格式
 * @param {Array} coordinates - 转换后的坐标数组，每个元素为对象形式 { wgs84Lng, wgs84Lat }
 * @returns {string} - 格式化后的字符串，每个经纬度间分行显示，中间以制表符隔开
 */
function formatCoordinates(coordinates) {
    return coordinates.map(coord => `${coord.lng}\t${coord.lat}`).join('\n');
}
