import React, { useEffect, useState } from "react";
import GoogleMapReact, { ChangeEventValue } from "google-map-react";

/**
 * GeoLocationAPIのレスポンス
 * 今回使うな部分のみ
 */
interface GeocodingAPIResponse {
    plus_code: {
        compound_code: string;
        global_code: string;
    };
}

/**
 * Mapに使用するプロパティ
 */
interface MapProps {
    center: {
        lat: number;
        lng: number;
    };
    zoom: number;
}

/**
 * MapのPropsの初期値
 */
const initialMapProps: MapProps = {
    center: {
        lat: 35.39,
        lng: 139.44,
    },
    zoom: 18,
};

/**
 * APIキー
 */
const API_KEY = "AIzaSyAGNGbHGpTca1CXdOfH2Ct3_qlMIdHyeNw"; // TODO: 自分のキーをここに入力

/**
 * サンプルとして地図を表示するコンポーネント
 */
const SampleMap = () => {
    const [mapProps, setMapProps] = useState<MapProps>(initialMapProps);
    const [location, setLocation] = useState<string>("");

    /**
    * 地図の状態が変更された際にstateを更新する
    * @param v
    */
    const changeMap = (v: ChangeEventValue) => {
        const nextMapProps = {
            center: v.center,
            zoom: v.zoom,
        };
        setMapProps(nextMapProps);
    };

    /**
    * GeocodingAPIを使って現在の地図の中心を表す文字列を返す
    * @returns
    */
    async function callGeocodingAPI(): Promise<GeocodingAPIResponse> {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${mapProps.center.lat},${mapProps.center.lng}&key=${API_KEY}`;
        const response = await fetch(url);
        const body = (await response.json()) as GeocodingAPIResponse;
        return body;
    }

    /**
    * 地図の表示が変更された時locationを更新する
    */
    useEffect(() => {
        const callAPI = async () => {
        const response = await callGeocodingAPI();
        setLocation(response.plus_code.compound_code);
        };
        callAPI();
    }, [mapProps]);

    /**
    * 描画
    */
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            ({mapProps.center.lat},{mapProps.center.lng}),zoom:{mapProps.zoom}
            {location}
            <GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={initialMapProps.center}
            center={mapProps.center}
            defaultZoom={initialMapProps.zoom}
            zoom={mapProps.zoom}
            onChange={changeMap}
        />
        </div>
    );
};

export default SampleMap;