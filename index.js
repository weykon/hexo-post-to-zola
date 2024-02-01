const fs = require('fs');
const { parsePost } = require('hexo-post-parser');
const { encode } = require('punycode');

async function walk_file(name) {
    console.log(name)
    const parse = await parsePost(`../content/blog/_posts/${name}`);

    if (!parse) {
        const new_doc = `+++\ntitle = "${name}"\ndate = "${new Date().toISOString()}"\n+++\n${fs.readFileSync(`../content/blog/_posts/${name}`, 'utf-8')}`
        fs.writeFileSync(`../content/blog/posts/${name}`, new_doc);
        return
    } 

    const { title, date, tags } = parse.metadata;
    console.log(title, date, tags)
    // 创建 Zola 的 TOML 元数据
    if (title) {
        const tomlMetadata = `+++\ntitle = "${title}"\ndate = "${new Date(date).toISOString()}"\n+++\n`;

        // 将 TOML 元数据和原始的内容组合成一个新的文档
        const newContent = tomlMetadata + parse.content;

        fs.writeFileSync(`../content/blog/posts/${name}`, newContent);
    }

}
function gen_zola_post(parse) {

}
for (let filename of fs.readdirSync('../content/blog/_posts')) {
    walk_file(filename)
}