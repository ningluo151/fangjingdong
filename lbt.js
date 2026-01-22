$(document).ready(function() {
    // 复制新闻列表实现无缝滚动
    $('.news-list:first').clone().appendTo('.news-track');
    
    // 动态计算宽度
    const listWidth = $('.news-list:first').width();
    $('.news-track').css('width', listWidth * 2);
    
    // 点击事件处理
    $('.news-list a').click(function(e) {
      e.preventDefault();
      const newsId = $(this).data('id');
      alert(`跳转到新闻详情页: ${newsId}`);
      // 实际使用: window.location.href = $(this).attr('href');
    });
    
    // 响应式处理
    $(window).resize(function() {
      const newWidth = $('.news-list:first').width();
      $('.news-track').css('width', newWidth * 2);
    });

  });
  