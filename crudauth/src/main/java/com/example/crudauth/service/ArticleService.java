package com.example.crudauth.service;

import com.example.crudauth.entity.Article;
import com.example.crudauth.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    // Créer un article
    public Article createArticle(Article article) {
        return articleRepository.save(article);
    }

    // Récupérer tous les articles
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    // Récupérer un article par ID (lance une exception si non trouvé)
    public Article getArticleById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("L'ID ne peut pas être null");
        }
        return articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article non trouvé avec ID : " + id));
    }

    // Mettre à jour un article
    public Article updateArticle(Long id, Article updatedArticle) {
        if (id == null) {
            throw new IllegalArgumentException("L'ID ne peut pas être null");
        }

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article non trouvé avec ID : " + id));

        article.setName(updatedArticle.getName());
        article.setDescription(updatedArticle.getDescription());
        article.setPrice(updatedArticle.getPrice());
        article.setQuantity(updatedArticle.getQuantity());
        article.setCategory(updatedArticle.getCategory());

        return articleRepository.save(article);
    }

    // Supprimer un article
    public void deleteArticle(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("L'ID ne peut pas être null");
        }
        articleRepository.deleteById(id);
    }
}
