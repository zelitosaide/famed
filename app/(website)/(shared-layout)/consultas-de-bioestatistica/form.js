"use client";

import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Grid, Select, Text, TextArea, TextField, Theme } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';

const topicos = [
  "Cálculo de amostra",
  "Análise estatística descritiva (tabela/gráfico)",
  "Análise estatística inferencial (bivariada/multivariada/outros)",
  "Sobre base de dados (Criação, limpeza, preparação para análises, etc)",
  "Reporte, interpretação de resultados de análise inferencial",
  "Redação de aspectos de análise estatística no protocolo",
  "Outro",
];

export default function Form() {
  return (
    <form>
      <Theme>
        <Flex direction="column" gap="5">
          <Grid columns="2" gap="5" width="auto">
            <Box>
              <Text style={{ color: "#178415" }} size="2" weight="bold" as="p" mb="1">
                Nome Completo
              </Text>
              <TextField.Input 
                radius="medium" 
                size="3"
                placeholder="Escreva seu nome completo"
                color="grass"
                style={{ fontSize: 15 }}
              />
            </Box>
            <Box>
              <Text style={{ color: "#178415" }} size="2" weight="bold" as="p" mb="1">
                E-mail
              </Text>
              <TextField.Input 
                radius="medium" 
                size="3"
                placeholder="Escreva seu email"
                color="grass"
                style={{ fontSize: 15 }}
              />
            </Box>
            <Box>
              <Text style={{ color: "#178415" }} size="2" weight="bold" as="p" mb="1">
                Contacto telemóvel
              </Text>
              <TextField.Input 
                radius="medium" 
                size="3"
                placeholder="Digite seu número de telefone"
                color="grass"
                style={{ fontSize: 15 }}
              />
            </Box>
            <Box>
              <Text style={{ color: "#178415" }} size="2" weight="bold" as="p" mb="1">
                Data e hora (apenas em todas Quarta-feira, das 16-18h)
              </Text>
              <TextField.Input 
                type="date"
                radius="medium" 
                size="3"
                placeholder="Search the docs…"
                color="grass"
                style={{ fontSize: 15, paddingRight: 8 }}
              />
            </Box>
          </Grid>

          <Box>
            <Text style={{ color: "#178415" }} size="2" weight="bold" as="p" mb="1">
              Tópico de consulta
            </Text>
            <Select.Root size="3">
              <Select.Trigger 
                color="grass" 
                style={{ fontSize: 15, width: "100%" }} 
                radius="medium" placeholder="Selecione o Tópico da consulta" 
              />
              <Select.Content position="popper">
                {topicos.map(function(topico) {
                  return (
                    <Select.Item 
                      key={topico}
                      style={{ fontSize: 15 }} 
                      value={topico}
                    >
                      {topico}
                    </Select.Item>
                  );
                })}
              </Select.Content>
            </Select.Root>
          </Box>

          <Box>
            <Text style={{ color: "#178415" }} size="2" weight="bold" as="p" mb="1">
              Resumo da pesquisa (deixar um espaço com pelo menos 10 linhas)
            </Text>
            <TextArea 
              color="grass"
              style={{ fontSize: 15, height: 150 }}
              size="3" 
              placeholder="Digite o resumo da pesquisa" 
            />
          </Box>

          <Box>
            <Button
              style={{ width: "100%", backgroundColor: "#1b9a19" }} 
              variant="solid"
              size="3"
              className="!outline outline-offset-2 outline-2 focus:outline-[#23c520] cursor-pointer disabled:opacity-70 disabled:cursor-progress"
            >
              <BookmarkFilledIcon /> Marcar a Consulta
            </Button>
          </Box>
        </Flex>
      </Theme>
    </form>
  );
}