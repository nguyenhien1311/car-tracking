<template>
  <div class="tw-container tw-mx-auto tw-mt-10">
    <GoogleMap api-key="AIzaSyA0EemaEqNETBiRAy6JhHMhAXSkIbbo1Cs" style="width: 100%; height: 500px"
      :center="currentPosition" :zoom="15" :autoRefresh="true" ref="mapRef">
      <Marker ref="markerRef" :options="{ position: currentPosition }">
        <InfoWindow v-model="infowindow">
          <div id="content" class="tw-flex tw-flex-col tw-gap-1">
            <div class="tw-text-lg tw-font-extrabold">
              lat: {{ currentPosition.lat }}
            </div>
            <div class="tw-text-lg tw-font-extrabold">
              long: {{ currentPosition.lng }}
            </div>
          </div>
        </InfoWindow>
      </Marker>
    </GoogleMap>
  </div>
</template>
<script setup>
import {
  onMounted, reactive, ref, watch,
} from 'vue';
import {
  GoogleMap, Marker, InfoWindow,
} from 'vue3-google-map';

const currentPosition = reactive({ lat: 0, lng: 0 });
const infowindow = ref();
const mapRef = ref();
const markerRef = ref();

const locateCurrentPosition = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    resolve,
    reject,
    {
      enableHighAccuracy: true,
    },
  );
});

const loadMyPosition = async () => {
  try {
    const position = await locateCurrentPosition();
    currentPosition.lat = position.coords.latitude;
    currentPosition.lng = position.coords.longitude;
  } catch (error) {
    console.log(error.message);
  }
};

onMounted(async () => {
  watch(() => mapRef.value.ready, async (isReady) => {
    if (!isReady) return;
    await loadMyPosition();
    const gmap = mapRef.value.map;
    gmap.setZoom(16);
    gmap.setCenter(currentPosition);
    const { marker } = markerRef.value;
    marker.setPosition(currentPosition);
  });
});
</script>
