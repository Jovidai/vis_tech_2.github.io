function yourFunction(d) {

}

d3.csv("Path to the YouTube Dataset", yourFunction).then(function(data) {

});

function parseCsv(d) {
    if(+d.likes >=1000) {
        return {
            video_id: d.video_id,
            title: d.title,
            trending_data: d.trending_data,
            //
            category: d.category,
            views: +d.view_count,
            comments: +d.comments,
            dislike: +d.dislike
        }
    }
}