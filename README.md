## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Test
1. NextJS multilingual Project
    - Install next-i18next lib
    - Add file next-i18next.config
    - Add i18n in file next.config
    - Add reloadOnPrerender to see updates translation JSON files without having to restart your server each time.
    - HOC appWithTranslation wrap the app
    - Include async function serverSideTranslations with locale dependencies on the page level components via getStaticProps or getServerSideProps.
Use useTranslation hook
2. Handle Token refresh token (https://test-react.agiletech.vn/api)
    - Get Access token.
    - Check expires time token before a second: 
        + if return true -> stop and call api with token.
        + if return false -> call api refresh token.
3. Dockerbuild
    - Add file Dockerfile on the top level.
    - Step BASE: Init from node:16-alpine and copy package.
    - Step BUILD: Init from node:16-alpine and Take node_module from BASE and copy source code (COPY . .) and yarn build.
    - Step PRODUCTION: Init from node:16-alpine and Copy source code from BUILD
4. Add google maps, thực hiện event chọn 1 địa điểm, insert marker + vẽ hình tròn có bán kính 5km xung quanh địa điểm đó. Mỗi lần click lại trên bản đồ thì vẽ lại điểm đó và xoá điểm cũ đi.
    - Install google-maps lib
    - Add component return div with id is map
    - Use google.maps.Map(document.getElementById("map")) to init maps.
    - Use google.maps.Marker to add marker.
    - Use google.maps.Polygon to draw circle.
    - Add event click with latLng property of google.maps.Map, when click:
        + Use marker.setPosition with new latLng to change marker.
        + Set Paths of Polygon with new center, distant and points.
        + Use panTo makes the experience smoother.
5. CI CD Github actions (optional) (Sẽ tốt hơn nếu chạy được với docker và aws ec2 instance)
    CI: - Add file .yml in the .github/workflows/
        - Get discord webhook key and set in the setting of repository.
Mô tả cách hoạt động với file README.md trên từng mục
