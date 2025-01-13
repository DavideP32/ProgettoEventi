package com.eventi.eventi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventi.eventi.entities.Evento;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long>{

    // List<Evento> findByNome(String nome);
    List<Evento> findByNomeContainingIgnoreCase(String nome);
}
