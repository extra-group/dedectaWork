<template>
    <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
            <div class="w-full flex justify-between items-center p-4 bg-slate-50">
                <h2 class="capitalize text-2xl font-bold">Posts</h2>

                <div class="flex sm:flex-row flex-col items-center justify-center gap-5">
                    <div class="flex items-center justify-center space-x-4">

                        <div class="flex items-center justify-center bg-white px-4 space-x-2 h-10 rounded-full">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <input type="text" @input="FilterPost" v-model="searchKey"
                                class="h-8 focus:outline-none text-sm text-gray-400" placeholder="Filter..">
                        </div>
                    </div>
                    <USelectMenu class="min-w-[12rem] text-gray-500" v-model="selectedPlatforms" :options="items"
                        value-attribute="value" multiple placeholder="Select Platform" />
                </div>
            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                    Platform
                    <div class="flex items-center justify-between">
                        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite
                            products
                            designed to help you work and play, stay organized, get answers, keep in touch, grow your
                            business,
                            and more.</p>
                        <div class="flex items-center justify-center border bg-white px-4 space-x-2 h-10 rounded-full">

                            <input type="text" v-model="term" class="h-8 focus:outline-none text-sm text-gray-400"
                                placeholder="Hashtag...">
                            <svg @click="getNewData" class="cursor-pointer w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                    </div>

                </caption>
                <thead class="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 whitespace-nowrap">
                            Platform name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            User Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Content
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Likes
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Shares
                        </th>
                        <th @click="orderByDate" scope="col"
                            class="px-6 py-3 flex items-center justify-center gap-2 cursor-pointer">
                            <p>
                                Created
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M20 17h3l-4 4l-4-4h3V3h2zM8 5c-3.86 0-7 3.13-7 7s3.13 7 7 7c3.86 0 7-3.13 7-7s-3.13-7-7-7m2.19 9.53L7 12.69V9h1.5v2.82l2.44 1.41z" />
                            </svg>
                        </th>
                        <!-- <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in allPost" :key="post.id" class="bg-white border-b dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
                            {{ post.platform }}
                        </th>
                        <td class="px-6 py-4">
                            {{ post.username }}
                        </td>
                        <td :title="post.contentText" class="px-6 py-4 line-clamp-1 cursor-progress">
                            {{ post.contentText }}
                        </td>
                        <td class="px-6 py-4">
                            {{ post.likesCount }}
                        </td>
                        <td class="px-6 py-4">
                            {{ post.shareCount }}
                        </td>
                        <td class="px-6 py-4">
                            {{ new Date(post.createdDate).toLocaleString('tr-TR') }}
                        </td>
                        <!-- <td class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View
                                Detail</a>
                        </td> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { usePostStore } from "~/store/posts";
const searchKey = ref(''); // Arama anahtarı
const open = ref(true)
const oldToNew = ref(true)
const postStore = usePostStore();
const allPost = ref(postStore.getPosts); // Filtrelenmiş veriler
const originalPosts = ref(postStore.getPosts); // Filtrelenmiş veriler
const term = ref(postStore.getKey)


const items = [
    // {
    //     label: 'Facebook',
    //     value: 'facebook',
    //     avatar: {
    //         src: 'https://api.iconify.design/ic:baseline-facebook.svg'
    //     }
    // },
    {
        label: 'Twitter',
        value: 'twitter',
        avatar: {
            src: 'https://api.iconify.design/mdi:twitter.svg'
        }
    },
    {
        label: 'Instagram',
        value: 'instagram',
        avatar: {
            src: 'https://api.iconify.design/mdi:instagram.svg'
        }
    }
]
const selectedPlatforms = ref(items.map(item => item.value));

const getTwitterPosts = async () => {
    const url = 'https://twitter154.p.rapidapi.com/search/search/continuation?' + new URLSearchParams({
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
            'x-rapidapi-key': 'af717fa85cmsh5c905eb77e872c3p184c12jsnac491d5ca93b',
            'x-rapidapi-host': 'twitter154.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
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

        // console.log(result);

    } catch (error) {
        console.error(error);
    }
    allPost.value = [...originalPosts.value];
}
const getInstagramPosts = async () => {
    const url = 'https://instagram-scraper-api2.p.rapidapi.com/v1.1/hashtag?' + new URLSearchParams({
        hashtag: term.value
    });
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd8e11cc399msh5955dcb503544dap13dc2ejsn4d181a8ab1cf',
            'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
        result.data.items.forEach(item => {
            originalPosts.value.push({
                id: item.id || 0,
                username: item.user.full_name || 0,
                contentText: item.caption_text || 0,
                mediaConten: item.image_versions[0] || 0,
                createdDate: new Date(item.taken_at) || 0,
                likesCount: item.like_count || 0,
                shareCount: item?.retweet_count || 0,
                platform: 'instagram'
            });
        });

        allPost.value = [...originalPosts.value];

    } catch (error) {
        console.error(error);
    }
}


const FilterByPlatform = (platforms) => {
    allPost.value = originalPosts.value.filter((item) => platforms.includes(item.platform));
    FilterPost();
}

const FilterPost = () => {
    const search = searchKey.value.toLowerCase();
    if (search === '') {
        allPost.value = originalPosts.value.filter((item) => selectedPlatforms.value.includes(item.platform));
    } else {
        allPost.value = allPost.value.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(search)
            )
        );
    }
}

const orderByDate = () => {
    oldToNew.value = !oldToNew.value
    if (oldToNew.value) {
        allPost.value.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
    }
    else {
        allPost.value.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    }
}


watch(selectedPlatforms, (newVal) => {
    FilterByPlatform(newVal);
});

watch(searchKey, () => {
    FilterPost();
});
watch(term, (newVal) => {
    postStore.setKey(newVal)
});

const fetchAllPosts = async () => {
    try {
        await Promise.all([getTwitterPosts(), getInstagramPosts()]);
        allPost.value = [...originalPosts.value];
        postStore.emptyPosts()
        postStore.setPosts(allPost.value)
        orderByDate()
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

const getNewData = () => {
    allPost.value = [];
    originalPosts.value = [];
    fetchAllPosts()
}


onMounted(() => {
    // getTwitterPosts();
    // cloneTwitter();
    // getInstagramPosts();
    // cloneInstagram()
})

</script>