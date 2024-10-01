<template>
    <table class="w-full text-xs xl:text-sm text-left text-gray-500 dark:text-gray-400">
        <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
            Platform
            <div class="flex items-center justify-between">
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite
                    products
                    designed to help you work and play, stay organized, get answers, keep in touch, grow your
                    business,
                    and more.</p>
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

        </caption>
        <thead class="text-xs xl:text-sm text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
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
            <PostItem v-for="post in allPost" :key="post.id" :post="post" />

        </tbody>
    </table>
</template>

<script setup>
import { usePostStore } from "~/store/posts";

const postStore = usePostStore();
const allPost = ref(postStore.getPosts);
const open = ref(true)
const items = [
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
const searchKey = ref('');
const oldToNew = ref(true)

watch(() => postStore.getPosts, (newPosts) => {
    allPost.value = newPosts;
});

watch(searchKey, () => {
    FilterPost();
});

watch(selectedPlatforms, (newVal) => {
    FilterByPlatform(newVal);
});

const FilterByPlatform = (platforms) => {
    allPost.value = postStore.getPosts.filter((item) => platforms.includes(item.platform));
    FilterPost();
}

const FilterPost = () => {
    const search = searchKey.value.toLowerCase();
    if (search === '') {
        allPost.value = postStore.getPosts.filter((item) => selectedPlatforms.value.includes(item.platform));
    } else {
        allPost.value = postStore.getPosts.filter(item =>
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

</script>