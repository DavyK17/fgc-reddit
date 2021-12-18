import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import { store } from '../../app/store';
import Posts from '../../features/Posts/Posts';
import { fetchPosts, setSearchTerm, setFilter } from "../../features/Posts/postsSlice";
import { setActive } from "../../features/Subreddits/subredditsSlice";

export const postsMock = [
    {
        title: 'Tekken Dojo: Ask Questions Here',
        hide_score: false,
        name: 't3_r5kux2',
        secure_media: null,
        secure_media_embed: {},
        score: 22,
        created_utc: 1638270016,
        selftext_html: '&lt;!-- SC_OFF --&gt;&lt;div class="md"&gt;&lt;p&gt;Welcome to the &lt;a href="/r/Tekken/about/wiki/tekken-dojo"&gt;Tekken Dojo&lt;/a&gt;, a place for everyone to learn and get better at the wonderful game that is Tekken.&lt;/p&gt;\n\n&lt;h2&gt;Beginners should first familiarize themselves with the &lt;a href="/r/Tekken/wiki/beginner-resources"&gt;Beginner Resources&lt;/a&gt; to avoid asking questions already answered there.&lt;/h2&gt;\n\n&lt;p&gt;Post your question here and get an answer. Helpful contributors will be awarded &lt;a href="https://www.reddit.com/r/Tekken/wiki/tekken-dojo/dojo-leaderboard"&gt;Dojo Points&lt;/a&gt;, which can make them Dojo Master at the end of the month (awards a unique flair). Please report unhelpful contributors to ensure the dojo remains a place dedicated to improvement.&lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;',
        id: 'r5kux2',
        author: 'AutoModerator',
        num_comments: 157,
        permalink: '/r/Tekken/comments/r5kux2/tekken_dojo_ask_questions_here/',
        url: 'https://www.reddit.com/r/Tekken/comments/r5kux2/tekken_dojo_ask_questions_here/',
        url_overriden_by_dest: 'https://www.reddit.com/r/Tekken/comments/r5kux2/tekken_dojo_ask_questions_here/',
        post_hint: "foo",
        is_video: false,
        comments: [
            {
                kind: 't1',
                data: {
                    subreddit_id: 't5_2s7yn',
                    approved_at_utc: null,
                    author_is_blocked: false,
                    comment_type: null,
                    awarders: [],
                    mod_reason_by: null,
                    banned_by: null,
                    author_flair_type: 'text',
                    total_awards_received: 0,
                    subreddit: 'Tekken',
                    author_flair_template_id: null,
                    likes: null,
                    replies: '',
                    user_reports: [],
                    saved: false,
                    id: 'ho190ze',
                    banned_at_utc: null,
                    mod_reason_title: null,
                    gilded: 0,
                    archived: false,
                    collapsed_reason_code: null,
                    no_follow: true,
                    author: 'EmvyPH',
                    can_mod_post: false,
                    created_utc: 1639169785,
                    send_replies: true,
                    parent_id: 't3_r5kux2',
                    score: 1,
                    author_fullname: 't2_fd9hl',
                    approved_by: null,
                    mod_note: null,
                    all_awardings: [],
                    collapsed: false,
                    body: 'Does Ling not have any combo after the floor breaks?',
                    edited: false,
                    top_awarded_type: null,
                    author_flair_css_class: null,
                    name: 't1_ho190ze',
                    is_submitter: false,
                    downs: 0,
                    author_flair_richtext: [],
                    author_patreon_flair: false,
                    body_html: '&lt;div class="md"&gt;&lt;p&gt;Does Ling not have any combo after the floor breaks?&lt;/p&gt;\n&lt;/div&gt;',
                    removal_reason: null,
                    collapsed_reason: null,
                    distinguished: null,
                    associated_award: null,
                    stickied: false,
                    author_premium: false,
                    can_gild: true,
                    gildings: {},
                    unrepliable_reason: null,
                    author_flair_text_color: null,
                    score_hidden: true,
                    permalink: '/r/Tekken/comments/r5kux2/tekken_dojo_ask_questions_here/ho190ze/',
                    subreddit_type: 'public',
                    locked: false,
                    report_reasons: null,
                    created: 1639169785,
                    author_flair_text: null,
                    treatment_tags: [],
                    link_id: 't3_r5kux2',
                    subreddit_name_prefixed: 'r/Tekken',
                    controversiality: 0,
                    depth: 0,
                    author_flair_background_color: null,
                    collapsed_because_crowd_control: null,
                    mod_reports: [],
                    num_reports: null,
                    ups: 1
                },
            },
            {
                kind: 't1',
                data: {
                    subreddit_id: 't5_2s7yn',
                    approved_at_utc: null,
                    author_is_blocked: false,
                    comment_type: null,
                    awarders: [],
                    mod_reason_by: null,
                    banned_by: null,
                    author_flair_type: 'richtext',
                    total_awards_received: 0,
                    subreddit: 'Tekken',
                    author_flair_template_id: 'd42fc2d4-e976-11e4-8a74-22000b6b9e70',
                    likes: null,
                    replies: '',
                    user_reports: [],
                    saved: false,
                    id: 'ho0seqk',
                    banned_at_utc: null,
                    mod_reason_title: null,
                    gilded: 0,
                    archived: false,
                    collapsed_reason_code: null,
                    no_follow: true,
                    author: 'Frybread002',
                    can_mod_post: false,
                    created_utc: 1639163190,
                    send_replies: true,
                    parent_id: 't3_r5kux2',
                    score: 1,
                    author_fullname: 't2_3w8zbm8u',
                    approved_by: null,
                    mod_note: null,
                    all_awardings: [],
                    collapsed: false,
                    body: 'I made another progress post and included a video with it. It go deleted. Again. This is the second time this had happened and I am confused because the first two progress posts that I made, the video did not get removed. If one of the mods explain to me what I did wrong, would be great.',
                    edited: false,
                    top_awarded_type: null,
                    author_flair_css_class: 'king',
                    name: 't1_ho0seqk',
                    is_submitter: false,
                    downs: 0,
                    author_flair_richtext: [
                        {
                        a: ':king:',
                        u: 'https://emoji.redditmedia.com/ujstnvqnkjw51_t5_2s7yn/king',
                        e: 'emoji'
                        },
                        {
                        e: 'text',
                        t: ' King'
                        }
                    ],
                    author_patreon_flair: false,
                    body_html: '&lt;div class="md"&gt;&lt;p&gt;I made another progress post and included a video with it. It go deleted. Again. This is the second time this had happened and I am confused because the first two progress posts that I made, the video did not get removed. If one of the mods explain to me what I did wrong, would be great.&lt;/p&gt;\n&lt;/div&gt;',
                    removal_reason: null,
                    collapsed_reason: null,
                    distinguished: null,
                    associated_award: null,
                    stickied: false,
                    author_premium: false,
                    can_gild: true,
                    gildings: {},
                    unrepliable_reason: null,
                    author_flair_text_color: 'dark',
                    score_hidden: false,
                    permalink: '/r/Tekken/comments/r5kux2/tekken_dojo_ask_questions_here/ho0seqk/',
                    subreddit_type: 'public',
                    locked: false,
                    report_reasons: null,
                    created: 1639163190,
                    author_flair_text: ':king: King',
                    treatment_tags: [],
                    link_id: 't3_r5kux2',
                    subreddit_name_prefixed: 'r/Tekken',
                    controversiality: 0,
                    depth: 0,
                    author_flair_background_color: '#edeff1',
                    collapsed_because_crowd_control: null,
                    mod_reports: [],
                    num_reports: null,
                    ups: 1
                },
            },
        ]
    },
    {
        title: 'Tekken Dojo 2: Ask Questions Here',
        hide_score: false,
        name: 't3_r5kux3',
        secure_media: null,
        secure_media_embed: {},
        score: 22,
        created_utc: 1638170016,
        selftext_html: '&lt;!-- SC_OFF --&gt;&lt;div class="md"&gt;&lt;p&gt;Welcome to the &lt;a href="/r/Tekken/about/wiki/tekken-dojo"&gt;Tekken Dojo&lt;/a&gt;, a place for everyone to learn and get better at the wonderful game that is Tekken.&lt;/p&gt;\n\n&lt;h2&gt;Beginners should first familiarize themselves with the &lt;a href="/r/Tekken/wiki/beginner-resources"&gt;Beginner Resources&lt;/a&gt; to avoid asking questions already answered there.&lt;/h2&gt;\n\n&lt;p&gt;Post your question here and get an answer. Helpful contributors will be awarded &lt;a href="https://www.reddit.com/r/Tekken/wiki/tekken-dojo/dojo-leaderboard"&gt;Dojo Points&lt;/a&gt;, which can make them Dojo Master at the end of the month (awards a unique flair). Please report unhelpful contributors to ensure the dojo remains a place dedicated to improvement.&lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;',
        id: 'r5kux3',
        author: 'AutoModerator',
        num_comments: 157,
        permalink: '/r/Tekken/comments/r5kux2/tekken_dojo_ask_questions_here/',
        url: 'https://www.reddit.com/r/Tekken/comments/r5kux2/tekken_dojo_ask_questions_here/',
        url_overriden_by_dest: 'https://www.reddit.com/r/Tekken/comments/r5kux2/tekken_dojo_ask_questions_here/',
        post_hint: "foo",
        is_video: false,
        comments: [
            {
                kind: 't1',
                data: {
                    subreddit_id: 't5_2s7yn',
                    approved_at_utc: null,
                    author_is_blocked: false,
                    comment_type: null,
                    awarders: [],
                    mod_reason_by: null,
                    banned_by: null,
                    author_flair_type: 'text',
                    total_awards_received: 0,
                    subreddit: 'Tekken',
                    author_flair_template_id: null,
                    likes: null,
                    replies: '',
                    user_reports: [],
                    saved: false,
                    id: 'ho190ze',
                    banned_at_utc: null,
                    mod_reason_title: null,
                    gilded: 0,
                    archived: false,
                    collapsed_reason_code: null,
                    no_follow: true,
                    author: 'EmvyPH',
                    can_mod_post: false,
                    created_utc: 1639169785,
                    send_replies: true,
                    parent_id: 't3_r5kux2',
                    score: 1,
                    author_fullname: 't2_fd9hl',
                    approved_by: null,
                    mod_note: null,
                    all_awardings: [],
                    collapsed: false,
                    body: 'Does Ling not have any combo after the floor breaks?',
                    edited: false,
                    top_awarded_type: null,
                    author_flair_css_class: null,
                    name: 't1_ho190ze',
                    is_submitter: false,
                    downs: 0,
                    author_flair_richtext: [],
                    author_patreon_flair: false,
                    body_html: '&lt;div class="md"&gt;&lt;p&gt;Does Ling not have any combo after the floor breaks?&lt;/p&gt;\n&lt;/div&gt;',
                    removal_reason: null,
                    collapsed_reason: null,
                    distinguished: null,
                    associated_award: null,
                    stickied: false,
                    author_premium: false,
                    can_gild: true,
                    gildings: {},
                    unrepliable_reason: null,
                    author_flair_text_color: null,
                    score_hidden: true,
                    permalink: '/r/Tekken/comments/r5kux2/tekken_dojo_ask_questions_here/ho190ze/',
                    subreddit_type: 'public',
                    locked: false,
                    report_reasons: null,
                    created: 1639169785,
                    author_flair_text: null,
                    treatment_tags: [],
                    link_id: 't3_r5kux2',
                    subreddit_name_prefixed: 'r/Tekken',
                    controversiality: 0,
                    depth: 0,
                    author_flair_background_color: null,
                    collapsed_because_crowd_control: null,
                    mod_reports: [],
                    num_reports: null,
                    ups: 1
                },
            },
            {
                kind: 't1',
                data: {
                    subreddit_id: 't5_2s7yn',
                    approved_at_utc: null,
                    author_is_blocked: false,
                    comment_type: null,
                    awarders: [],
                    mod_reason_by: null,
                    banned_by: null,
                    author_flair_type: 'richtext',
                    total_awards_received: 0,
                    subreddit: 'Tekken',
                    author_flair_template_id: 'd42fc2d4-e976-11e4-8a74-22000b6b9e70',
                    likes: null,
                    replies: '',
                    user_reports: [],
                    saved: false,
                    id: 'ho0seqk',
                    banned_at_utc: null,
                    mod_reason_title: null,
                    gilded: 0,
                    archived: false,
                    collapsed_reason_code: null,
                    no_follow: true,
                    author: 'Frybread002',
                    can_mod_post: false,
                    created_utc: 1639163190,
                    send_replies: true,
                    parent_id: 't3_r5kux2',
                    score: 1,
                    author_fullname: 't2_3w8zbm8u',
                    approved_by: null,
                    mod_note: null,
                    all_awardings: [],
                    collapsed: false,
                    body: 'I made another progress post and included a video with it. It go deleted. Again. This is the second time this had happened and I am confused because the first two progress posts that I made, the video did not get removed. If one of the mods explain to me what I did wrong, would be great.',
                    edited: false,
                    top_awarded_type: null,
                    author_flair_css_class: 'king',
                    name: 't1_ho0seqk',
                    is_submitter: false,
                    downs: 0,
                    author_flair_richtext: [
                        {
                        a: ':king:',
                        u: 'https://emoji.redditmedia.com/ujstnvqnkjw51_t5_2s7yn/king',
                        e: 'emoji'
                        },
                        {
                        e: 'text',
                        t: ' King'
                        }
                    ],
                    author_patreon_flair: false,
                    body_html: '&lt;div class="md"&gt;&lt;p&gt;I made another progress post and included a video with it. It go deleted. Again. This is the second time this had happened and I am confused because the first two progress posts that I made, the video did not get removed. If one of the mods explain to me what I did wrong, would be great.&lt;/p&gt;\n&lt;/div&gt;',
                    removal_reason: null,
                    collapsed_reason: null,
                    distinguished: null,
                    associated_award: null,
                    stickied: false,
                    author_premium: false,
                    can_gild: true,
                    gildings: {},
                    unrepliable_reason: null,
                    author_flair_text_color: 'dark',
                    score_hidden: false,
                    permalink: '/r/Tekken/comments/r5kux2/tekken_dojo_ask_questions_here/ho0seqk/',
                    subreddit_type: 'public',
                    locked: false,
                    report_reasons: null,
                    created: 1639163190,
                    author_flair_text: ':king: King',
                    treatment_tags: [],
                    link_id: 't3_r5kux2',
                    subreddit_name_prefixed: 'r/Tekken',
                    controversiality: 0,
                    depth: 0,
                    author_flair_background_color: '#edeff1',
                    collapsed_because_crowd_control: null,
                    mod_reports: [],
                    num_reports: null,
                    ups: 1
                },
            },
        ]
    },
];

const activeMock = {
    display_name: 'Tekken',
    title: '/r/Tekken: All things Tekken',
};

test("renders placeholder text by default", () => {
    render(
        <Provider store={store}>
            <Posts />
        </Provider>
    );

    expect(screen.getByText("Select a subreddit to view posts.")).toBeInTheDocument();
});

test("renders loading skeleton while fetch is pending", () => {
    render(
        <Provider store={store}>
            <Posts />
        </Provider>
    );
    const fetchMock = () => {
        return { type: fetchPosts.pending.type }
    }
    store.dispatch(fetchMock());

    expect(screen.getByTestId("author-loading")).toBeInTheDocument();
    expect(screen.getByTestId("post-loading")).toBeInTheDocument();
    expect(screen.getByTestId("comment-loading")).toBeInTheDocument();
});

describe("when fetch is fulfilled", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Posts />
            </Provider>
        );
        const fetchMock = () => {
            return { type: fetchPosts.fulfilled.type, payload: postsMock }
        }
        store.dispatch(fetchMock());
    });

    test("shows subreddit title when subreddit is selected", () => {
        const setMock = () => {
            return { type: setActive.type, payload: activeMock };
        }
        store.dispatch(setMock());
    
        expect(screen.getByText("/r/Tekken: All things Tekken")).toBeInTheDocument();
    });

    test("renders list of posts", () => {
        expect(screen.getByText("Tekken Dojo: Ask Questions Here")).toBeInTheDocument();
        expect(screen.getByText("Tekken Dojo 2: Ask Questions Here")).toBeInTheDocument(); 
    });

    test("renders lists of posts by filter when filter is set", () => {
        const setMock = () => {
            return { type: setFilter.type, payload: "new" };
        }
        store.dispatch(setMock());

        expect(screen.getByText("Tekken Dojo: Ask Questions Here")).toBeInTheDocument();
    }); 

    test("uses titles to show filtered posts when search term is set", () => {
        const setMock = () => {
            return { type: setSearchTerm.type, payload: "Tekken Dojo 2" };
        }
        store.dispatch(setMock());

        expect(screen.getByText("Tekken Dojo 2: Ask Questions Here")).toBeInTheDocument(); 
    });

    test("renders placeholder text when logout button is clicked", () => {
        store.dispatch({ type: "logoutUser" });
        expect(screen.getByText("Select a subreddit to view posts.")).toBeInTheDocument();
    });
});

test("renders error text when fetch is rejected", () => {
    render(
        <Provider store={store}>
            <Posts />
        </Provider>
    );
    const fetchMock = () => {
        return { type: fetchPosts.rejected.type }
    }
    store.dispatch(fetchMock());

    expect(screen.getByText("An error has occurred. Kindly try again.")).toBeInTheDocument(); 
});