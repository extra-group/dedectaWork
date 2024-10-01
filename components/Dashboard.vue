<template>
    <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
            <div class="w-full flex justify-between items-center p-4 bg-slate-50">
                <h2 class="capitalize text-2xl font-bold">Posts</h2>
                <div class="flex items-center justify-center border bg-white px-4 space-x-2 h-10 rounded-full">

                    <input type="text" v-model="term" class="h-8 focus:outline-none text-sm text-gray-400"
                        placeholder="Hashtag...">
                    <svg @click="fetchAllPosts" class="cursor-pointer w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
            </div>
            <PostList />
            <div v-if="loading" class="mx-auto w-80 border-none h-">
                <client-only>
                    <Vue3Lottie :animationData="loadingAnimation" :backgroundColor="'transparent'" :loop="true" />
                </client-only>
            </div>
        </div>
    </div>
</template>


<script setup>
import loadingAnimation from "~/assets/animation/loading.json"
import { usePostStore } from "~/store/posts";

const runtimeConfig = useRuntimeConfig();
const loading = ref(false)
const postStore = usePostStore();
const originalPosts = ref(postStore.getPosts);
const term = ref(postStore.getKey)



const getTwitterPosts = async () => {
    const url = runtimeConfig.public.apiURLTwitter + new URLSearchParams({
        query: term.value,
        section: 'top',
        min_likes: '10',
        limit: 20,
        start_date: '2022-01-01',
        language: 'en'
    });
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': runtimeConfig.public.apiKeyTwitter,
            'x-rapidapi-host': 'twitter154.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        result.results.forEach(item => {
            originalPosts.value.push({
                id: item.tweet_id,
                username: item.user.username,
                contentText: item.text,
                mediaConten: item.media_url,
                createdDate: new Date(item.creation_date),
                likesCount: item.favorite_count,
                shareCount: item.retweet_count,
                platform: 'twitter'
            });
        });


    } catch (error) {
        console.error(error);
    }
}
const getInstagramPosts = async () => {
    const url = runtimeConfig.public.apiURLInstagram + new URLSearchParams({
        hashtag: term.value
    });
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': runtimeConfig.public.apiKeyInstagram,
            'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        result.data.items.forEach(item => {
            originalPosts.value.push({
                id: item.id || 0,
                username: item.user.full_name || 0,
                contentText: item.caption_text || 0,
                mediaConten: item.image_versions[0] || 0,
                createdDate: new Date(item.taken_at) || 0,
                likesCount: item.like_count,
                shareCount: item?.retweet_count,
                platform: 'instagram'
            });
        });

    } catch (error) {
        console.error(error);
    }
}

watch(term, (newVal) => {
    postStore.setKey(newVal)
});

const fetchAllPosts = async () => {
    try {

        loading.value = true
        originalPosts.value = [];
        postStore.emptyPosts();

        await Promise.all([getTwitterPosts(), getInstagramPosts()]);

        postStore.setPosts(originalPosts.value)

        // orderByDate()
    } catch (error) {
        console.error("Error fetching posts:", error);
    } finally {
        loading.value = false
    }
};



</script>