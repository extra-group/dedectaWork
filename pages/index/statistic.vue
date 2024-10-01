<template>
    <div>
        <h1 class="sm:text-4xl text-xl ml-2 sm:pt-10 py-2 font-bold">İstatistikler</h1>
        <h2 class="italic text-base sm:text-xl ml-2 ">Zamana göre gönderi sayısı grafiği</h2>
        <div class="py-6">
            <hr>
        </div>
    </div>
    <div>
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>



<script setup>
import { usePostStore } from "~/store/posts";
const postStore = usePostStore();
const posts = postStore.getPosts

import { Bar } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import { ref } from 'vue';
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);


const modifiedPosts = posts.map((postItem) => {
    // Her postItem'ın shallow copy'sini oluştur
    const newPostItem = { ...postItem };  // spread ile kopyala, böylece orijinal postItem'a müdahale etmiyoruz

    // Tarihi yeni formatta ayarla
    newPostItem.createdDate = new Date(newPostItem.createdDate).toLocaleDateString('tr-TR', {
        year: 'numeric', month: '2-digit', day: '2-digit'
    });

    return newPostItem; // Yeni kopyalanmış nesneyi dön
});
const uniquePostDates = [... new Set(modifiedPosts.map((postItem) => postItem.createdDate))];
const dateCounts = uniquePostDates.reduce(
    (result, postDate) => {
        const twitterCount = modifiedPosts.filter(
            (post) =>
                post.platform === 'twitter' && post.createdDate === postDate,
        ).length;
        const instagramCount = modifiedPosts.filter(
            (post) =>
                post.platform === 'instagram' && post.createdDate === postDate,
        ).length;

        result.twitter.push(twitterCount);
        result.instagram.push(instagramCount);

        return result;
    },
    { instagram: [], twitter: [] },
);

const chartData = ref({
    labels: uniquePostDates,
    datasets: [
        {
            label: 'Twitter',
            backgroundColor: '#f87979',
            data: dateCounts.twitter,
        },
        {
            label: 'Instagram',
            backgroundColor: '#f83399',
            data: dateCounts.instagram,
        },
    ],
});
const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: true,
});






onMounted(() => {
    // getTwitterPosts();
    // cloneTwitter();
})


</script>