package com.example.crudauth.controller;

import com.example.crudauth.entity.Article;
import com.example.crudauth.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping
    public String articles(Model model, Authentication authentication) {
        model.addAttribute("articles", articleService.getAllArticles());
        if (authentication != null) {
            model.addAttribute("currentUser", authentication.getName());
        }
        return "articles";
    }

    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("article", new Article());
        return "edit-article";
    }

    @PostMapping("/save")
    public String save(Article article) {
        articleService.createArticle(article);
        return "redirect:/articles";
    }

    @GetMapping("/edit/{id}")
    public String editForm(@PathVariable Long id, Model model) {
        model.addAttribute("article", articleService.getArticleById(id));
        return "edit-article";
    }

    @PostMapping("/update/{id}")
    public String update(@PathVariable Long id, Article article) {
        articleService.updateArticle(id, article);
        return "redirect:/articles";
    }

    @PostMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return "redirect:/articles";
    }

    @PostMapping("/increase/{id}")
    public String increaseQuantity(@PathVariable Long id) {
        Article article = articleService.getArticleById(id);
        if (article != null) {
            article.setQuantity(article.getQuantity() + 1);
            articleService.updateArticle(id, article);
        }
        return "redirect:/articles";
    }

    @PostMapping("/decrease/{id}")
    public String decreaseQuantity(@PathVariable Long id) {
        Article article = articleService.getArticleById(id);
        if (article != null && article.getQuantity() > 0) {
            article.setQuantity(article.getQuantity() - 1);
            articleService.updateArticle(id, article);
        }
        return "redirect:/articles";
    }
}
